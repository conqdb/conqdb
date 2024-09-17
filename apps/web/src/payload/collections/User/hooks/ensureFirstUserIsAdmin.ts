import { User } from '@/payload-types'
import { COLLECTION_SLUG } from '@/payload/constants'
import { FieldHook } from 'payload'

export const ensureFirstUserIsAdmin: FieldHook<User> = async ({ req, operation, value }) => {
  if (operation === 'create') {
    const { totalDocs: userCount } = await req.payload.count({
      collection: COLLECTION_SLUG.USER,
    })

    if (userCount === 0 && !(value || []).includes('admin')) {
      return [...(value || []), 'admin']
    }
  }
}
