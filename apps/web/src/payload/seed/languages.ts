import { Payload } from 'payload'

export const seedLanguages = async (payload: Payload) => {
  await Promise.all([
    payload.create({
      collection: 'language',
      data: {
        name: 'Albanian',
        languageCode: 'sq',
        countryCode: 'AL',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Arabic',
        languageCode: 'ar',
        countryCode: 'SA',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Armenian',
        languageCode: 'hy',
        countryCode: 'AM',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Belarusian',
        languageCode: 'be',
        countryCode: 'BY',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Bosnian',
        languageCode: 'bs',
        countryCode: 'BA',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Bulgarian',
        languageCode: 'bg',
        countryCode: 'BG',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Croatian',
        languageCode: 'hr',
        countryCode: 'HR',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Czech',
        languageCode: 'cs',
        countryCode: 'CZ',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Danish',
        languageCode: 'da',
        countryCode: 'DK',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Dutch',
        languageCode: 'nl',
        countryCode: 'NL',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'English',
        languageCode: 'en',
        countryCode: 'GB',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Estonian',
        languageCode: 'et',
        countryCode: 'EE',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Finnish',
        languageCode: 'fi',
        countryCode: 'FI',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'French',
        languageCode: 'fr',
        countryCode: 'FR',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'German',
        languageCode: 'de',
        countryCode: 'DE',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Greek',
        languageCode: 'el',
        countryCode: 'GR',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Hebrew',
        languageCode: 'he',
        countryCode: 'IL',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Hungarian',
        languageCode: 'hu',
        countryCode: 'HU',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Irish',
        languageCode: 'ga',
        countryCode: 'IE',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Italian',
        languageCode: 'it',
        countryCode: 'IT',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Latvian',
        languageCode: 'lv',
        countryCode: 'LV',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Lithuanian',
        languageCode: 'lt',
        countryCode: 'LT',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Luxembourgish',
        languageCode: 'lb',
        countryCode: 'LU',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Norwegian',
        languageCode: 'no',
        countryCode: 'NO',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Polish',
        languageCode: 'pl',
        countryCode: 'PL',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Portuguese',
        languageCode: 'pt',
        countryCode: 'PT',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Romanian',
        languageCode: 'ro',
        countryCode: 'RO',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Russian',
        languageCode: 'ru',
        countryCode: 'RU',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Serbian',
        languageCode: 'sr',
        countryCode: 'RS',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Slovak',
        languageCode: 'sk',
        countryCode: 'SK',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Slovenia',
        languageCode: 'sl',
        countryCode: 'SI',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Spanish',
        languageCode: 'es',
        countryCode: 'ES',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Swedish',
        languageCode: 'sv',
        countryCode: 'SE',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Turkish',
        languageCode: 'tr',
        countryCode: 'TR',
      },
    }),
    payload.create({
      collection: 'language',
      data: {
        name: 'Ukrainian',
        languageCode: 'uk',
        countryCode: 'UA',
      },
    }),
  ])
}
