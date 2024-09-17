export const locales = ['en', 'ar', 'cz', 'de', 'pl', 'ru', 'tr'] as const

export type Locale = (typeof locales)[number]

export const localesData = {
  ar: {
    value: 'ar',
    dir: 'rtl',
    label: 'العربية',
    abbreviation: 'AR',
    countryCode: 'SA',
  },
  cz: {
    value: 'cz',
    dir: 'ltr',
    label: 'Čeština',
    abbreviation: 'CZ',
    countryCode: 'CZ',
  },
  de: {
    value: 'de',
    dir: 'ltr',
    label: 'Deutsch',
    abbreviation: 'DE',
    countryCode: 'DE',
  },
  en: {
    value: 'en',
    dir: 'ltr',
    label: 'English',
    abbreviation: 'EN',
    countryCode: 'GB',
  },
  pl: {
    value: 'pl',
    dir: 'ltr',
    label: 'Polski',
    abbreviation: 'PL',
    countryCode: 'PL',
  },
  ru: {
    value: 'ru',
    dir: 'ltr',
    label: 'Русский',
    abbreviation: 'РУ',
    countryCode: 'RU',
  },
  tr: {
    value: 'tr',
    dir: 'ltr',
    label: 'Türkçe',
    abbreviation: 'TR',
    countryCode: 'TR',
  },
}
