import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'
import { locales } from './locales'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { getCachedPayload } from './payload/plugins/CachedPayload'

const getTranslations = cache(async (locale: string) => {
  const payload = await getPayloadHMR({ config })
  const cachedPayload = getCachedPayload(payload)

  const common = await cachedPayload.findGlobal({
    slug: 't-common',
    locale: locale as any,
  })
  const auth = await cachedPayload.findGlobal({
    slug: 't-auth',
    locale: locale as any,
  })
  const navigation = await cachedPayload.findGlobal({
    slug: 't-navigation',
    locale: locale as any,
  })
  const profile = await cachedPayload.findGlobal({
    slug: 't-profile',
    locale: locale as any,
  })
  const validation = await cachedPayload.findGlobal({
    slug: 't-validation',
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
