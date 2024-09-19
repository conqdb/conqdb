import 'server-only'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'
import { cache } from 'react'

export const getUserBySlug = cache(async (slug: string) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const user = await cachedPayload.findOne({
    collection: 'user',
    value: slug,
  })

  return user
})

export const getUserUnits = cache(async (userId: string) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs } = await cachedPayload.find({
    collection: 'user-unit',
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
