import { Locale } from '@/locales'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'
import { COLLECTION_SLUG } from '@/payload/constants'

export const getAllUnits = async ({ locale }: { locale: Locale }) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs } = await cachedPayload.find({
    collection: COLLECTION_SLUG.UNIT,
    limit: 0,
    locale,
  })

  return docs
}

export const getUnitTypes = async ({ locale }: { locale: Locale }) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const { docs } = await cachedPayload.find({
    collection: COLLECTION_SLUG.UNIT_TYPE,
    limit: 0,
    locale,
  })

  return docs
}
