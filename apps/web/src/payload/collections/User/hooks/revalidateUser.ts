import { User } from '@/payload-types'
import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateUserAfterChange: CollectionAfterChangeHook<User> = async ({
  operation,
  req,
  previousDoc,
}) => {
  if (operation === 'update') {
    console.log('revalidateAfterUserChange called with update operation')
    revalidateTag(`user:${previousDoc.id}`)

    const sessions = await req.payload.find({
      collection: 'session',
      where: {
        user: {
          equals: previousDoc.id,
        },
      },
    })

    sessions.docs.forEach((doc) => revalidateTag(`session:${doc.id}`))
  }
}

export const revalidateUserAfterDelete: CollectionAfterDeleteHook = async ({ req, id }) => {
  revalidateTag(`user:${id}`)
  const sessions = await req.payload.find({
    collection: 'session',
    where: {
      userId: {
        equals: id,
      },
    },
  })

  sessions.docs.forEach((doc) => revalidateTag(`session:${doc.id}`))
}
