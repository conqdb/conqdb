import { Locale } from '@/locales'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'

export const getAllUnits = async ({ locale }: { locale: Locale }) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs } = await cachedPayload.find({
    collection: 'unit',
    limit: 0,
    locale,
  })

  return docs
}

export const getUnitTypes = async ({ locale }: { locale: Locale }) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs } = await cachedPayload.find({
    collection: 'unit-type',
    limit: 0,
    locale,
  })

  return docs
}
