import 'server-only'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'
import { cache } from 'react'
import { COLLECTION_SLUG } from '@/payload/constants'

export const getUserBySlug = cache(async (slug: string) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const user = await cachedPayload.findOne({
    collection: COLLECTION_SLUG.USER,
    value: slug,
  })

  return user
})

export const getUserUnits = cache(async (userId: string) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs } = await cachedPayload.find({
    collection: COLLECTION_SLUG.USER_UNIT,
    where: {
      user: {
        equals: userId,
      },
    },
    depth: 0,
    limit: 256,
  })

  return docs
})
