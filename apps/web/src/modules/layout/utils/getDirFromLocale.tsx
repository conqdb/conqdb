import { locales, localesData } from '@/locales'

export const getDirFromLocale = (locale: string) =>
  localesData[locale as (typeof locales)[number]]?.dir || 'ltr'
