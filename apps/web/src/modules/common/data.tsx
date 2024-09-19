import 'server-only'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'
import { cache } from 'react'

export const getLanguages = cache(async () => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs: languages } = await cachedPayload.find({
    collection: 'language',
    limit: 0,
  })

  return languages
})
