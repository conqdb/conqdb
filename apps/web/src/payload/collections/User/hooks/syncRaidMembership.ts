import { Raid, RaidMember, User } from '@/payload-types'
import { COLLECTION_SLUG } from '@/payload/constants'
import { APIError, FieldHook, Payload } from 'payload'

const getExistingMembership = async (
  payload: Payload,
  { user, raid }: { user: string | undefined; raid: string | Raid | undefined | null },
): Promise<RaidMember | null> => {
  if (typeof user !== 'string' || typeof raid !== 'string') {
    return null
  }
  const { docs } = await payload.find({
    collection: COLLECTION_SLUG.RAID_MEMBER,
    where: {
      and: [
        {
          user: {
            equals: user,
          },
        },
        {
          raid: {
            equals: raid,
          },
        },
      ],
    },
  })
  return docs[0] ?? null
}

const createNewMembership = async (
  payload: Payload,
  { user, raid }: { user: string | undefined; raid: string | Raid | undefined | null },
): Promise<RaidMember> => {
  if (typeof user !== 'string') {
    throw new APIError('createNewMembership user prop must be a string', 400, undefined, true)
  }
  if (typeof raid === undefined || typeof raid === null) {
    throw new APIError('createNewMembership raid prop must be a Raid type, or string')
  }

  const typedRaid = raid as Raid | string

  const newMembership = await payload.create({
    collection: COLLECTION_SLUG.RAID_MEMBER,
    data: {
      raid: typeof typedRaid === 'string' ? typedRaid : typedRaid?.id,
      user: user,
      role: 'member',
    },

    context: {
      source: COLLECTION_SLUG.USER,
    },
  })

  return newMembership
}

export const syncRaidMembership: FieldHook<User> = async ({
  req,
  context,
  collection,
  originalDoc,
  data,
  value,
  previousValue,
}) => {
  if (!originalDoc && data?.raid) {
    throw new APIError(
      'You cannot add a raid on new user. Please create the user, then add a raid later.',
      400,
      undefined,
      true,
    )
  }

  if (context?.source === undefined) {
    context.source = collection?.slug
  }
  const currentContext = Boolean(context.source === collection?.slug)

  if (currentContext) {
    const activeRoles = ['member', 'officer', 'leader']

    const userId = originalDoc?.id ?? null
    const raidId = value
    /**
     * Determine type of action
     */
    const isAddingNewRaid = Boolean(
      (originalDoc && !originalDoc?.raid && data?.raid) || (!originalDoc && data?.raid),
    )
    const isChangingRaid = Boolean(
      originalDoc && originalDoc?.raid && data?.raid && originalDoc?.raid !== data?.raid,
    )
    const isRemovingRaid = Boolean(originalDoc && originalDoc?.raid && !data?.raid)

    if (isAddingNewRaid) {
      const existingRaidMembership = await getExistingMembership(req.payload, {
        user: originalDoc?.id,
        raid: data?.raid,
      })

      if (existingRaidMembership && existingRaidMembership.role !== 'banned') {
        await req.payload.update({
          collection: COLLECTION_SLUG.RAID_MEMBER,
          id: existingRaidMembership.id,
          data: {
            role: 'member',
          },
          context: {
            source: collection?.slug,
          },
        })

        return value
      } else if (existingRaidMembership && existingRaidMembership.role === 'banned') {
        throw new APIError('Banned from raid.', 403, undefined, true)
      } else if (data?.raid && typeof data?.raid === 'string' && originalDoc?.id) {
        await createNewMembership(req.payload, {
          user: originalDoc.id,
          raid: data.raid,
        })
        return value
      }
    }

    if (isChangingRaid && originalDoc && previousValue) {
      //set old raid to alumni role
      await req.payload.update({
        collection: COLLECTION_SLUG.RAID_MEMBER,
        where: {
          and: [
            {
              user: {
                equals: originalDoc.id,
              },
            },
            {
              raid: {
                equals: previousValue,
              },
            },
            {
              role: {
                in: activeRoles,
              },
            },
          ],
        },
        data: { role: 'alumni' },
        context: {
          source: collection?.slug,
        },
      })

      const existingMembership = await getExistingMembership(req.payload, {
        user: originalDoc?.id,
        raid: raidId,
      })

      if (existingMembership && existingMembership.role !== 'banned') {
        await req.payload.update({
          collection: COLLECTION_SLUG.RAID_MEMBER,
          id: existingMembership.id,
          data: {
            role: 'member',
          },
          context: {
            source: collection?.slug,
          },
        })

        return value
      } else if (existingMembership && existingMembership.role === 'banned') {
        throw new APIError('Banned from raid.', 403, undefined, true)
      } else if (data?.raid && typeof data?.raid === 'string' && originalDoc?.id) {
        await createNewMembership(req.payload, {
          user: originalDoc?.id,
          raid: data?.raid,
        })

        return value
      }
    }

    if (isRemovingRaid && originalDoc?.raid) {
      await req.payload.update({
        collection: COLLECTION_SLUG.RAID_MEMBER,
        where: {
          and: [
            {
              user: {
                equals: userId,
              },
            },
            {
              role: {
                in: activeRoles,
              },
            },
          ],
        },
        data: {
          role: 'alumni',
        },
        context: {
          source: collection?.slug,
        },
      })

      return value
    }
  }

  return value
}
