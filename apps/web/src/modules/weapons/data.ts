import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'
import { cache } from 'react'
import { Locale } from '@/locales'

export const getWeapons = cache(async (locale: Locale) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs: weapons } = await cachedPayload.find({
    collection: 'weapon',
    limit: 0,
    locale: locale,
  })

  return weapons
})
