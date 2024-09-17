import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './locales'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getCachedPayload } from './payload/plugins/CachedPayload'
import { GLOBAL_SLUG } from './payload/constants'

const getTranslations = cache(async (locale: string) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const common = await cachedPayload.findGlobal({
    slug: GLOBAL_SLUG.T_COMMON,
    locale: locale as any,
  })
  const auth = await cachedPayload.findGlobal({
    slug: GLOBAL_SLUG.T_AUTH,
    locale: locale as any,
  })
  const navigation = await cachedPayload.findGlobal({
    slug: GLOBAL_SLUG.T_NAVIGATION,
    locale: locale as any,
  })
  const profile = await cachedPayload.findGlobal({
    slug: GLOBAL_SLUG.T_PROFILE,
    locale: locale as any,
  })
  const validation = await cachedPayload.findGlobal({
    slug: GLOBAL_SLUG.T_VALIDATION,
    locale: locale as any,
  })

  const messages = {
    common,
    auth,
    navigation,
    profile,
    validation,
  }

  return messages as any
})

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound()

  const translations = await getTranslations(locale)

  return {
    messages: translations,
  }
})
