import { RaidMember } from '@/payload-types'
import { CollectionAfterDeleteHook } from 'payload'

export const handleMemberDelete: CollectionAfterDeleteHook<RaidMember> = async ({ req, doc }) => {
  const activeRoles = ['member', 'officer', 'leader']

  if (activeRoles.includes(doc?.role) && doc?.user) {
    await req.payload.update({
      collection: 'user',
      id: typeof doc?.user === 'string' ? doc?.user : doc?.user?.id,
      data: {
        raid: null,
      },
      context: {
        source: 'delete-raid-member',
      },
    })
  }
  return
}
