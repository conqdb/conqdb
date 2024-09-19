import { RaidMember } from '@/payload-types'
import { FieldHook } from 'payload'

export const handleMemberRole: FieldHook<RaidMember> = async ({
  req,
  context,
  value,
  previousValue,
  data,
  collection,
}) => {
  if (context?.source === undefined) {
    context.source = collection?.slug
  }
  const currentContext = Boolean(context.source === collection?.slug)

  if (currentContext) {
    if (value !== previousValue) {
      const activeRoles = ['member', 'officer', 'leader']
      const inactiveRoles = ['alumni', 'banned']

      const userUpdateRequired =
        (!previousValue && activeRoles.includes(value)) ||
        (activeRoles.includes(previousValue) && inactiveRoles.includes(value)) ||
        (inactiveRoles.includes(previousValue) && activeRoles.includes(value))

      const userId =
        typeof data?.user === 'string'
          ? data?.user
          : typeof data?.user === 'object'
            ? data?.user?.id
            : null
      const raidId =
        typeof data?.raid === 'string'
          ? data?.raid
          : typeof data?.raid === 'object'
            ? data?.raid?.id
            : null

      if (userUpdateRequired && userId && raidId) {
        if (activeRoles.includes(value)) {
          await req.payload.update({
            collection: 'raid-member',
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
          })

          await req.payload.update({
            collection: 'user',
            id: userId,
            data: { raid: raidId },
            context: {
              source: collection?.slug,
            },
          })
        }

        if (inactiveRoles.includes(value)) {
          await req.payload.update({
            collection: 'user',
            id: userId,
            data: { raid: null },
            context: {
              source: collection?.slug,
            },
          })
        }
      }
    }
  }

  return value
}
