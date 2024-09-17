import { Payload } from 'payload'
import { COLLECTION_SLUG } from '../constants'

export const seedLanguages = async (payload: Payload) => {
  await Promise.all([
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Albanian',
        languageCode: 'sq',
        countryCode: 'AL',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Arabic',
        languageCode: 'ar',
        countryCode: 'SA',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Armenian',
        languageCode: 'hy',
        countryCode: 'AM',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Belarusian',
        languageCode: 'be',
        countryCode: 'BY',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Bosnian',
        languageCode: 'bs',
        countryCode: 'BA',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Bulgarian',
        languageCode: 'bg',
        countryCode: 'BG',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Croatian',
        languageCode: 'hr',
        countryCode: 'HR',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Czech',
        languageCode: 'cs',
        countryCode: 'CZ',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Danish',
        languageCode: 'da',
        countryCode: 'DK',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Dutch',
        languageCode: 'nl',
        countryCode: 'NL',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'English',
        languageCode: 'en',
        countryCode: 'GB',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Estonian',
        languageCode: 'et',
        countryCode: 'EE',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Finnish',
        languageCode: 'fi',
        countryCode: 'FI',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'French',
        languageCode: 'fr',
        countryCode: 'FR',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'German',
        languageCode: 'de',
        countryCode: 'DE',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Greek',
        languageCode: 'el',
        countryCode: 'GR',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Hebrew',
        languageCode: 'he',
        countryCode: 'IL',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Hungarian',
        languageCode: 'hu',
        countryCode: 'HU',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Irish',
        languageCode: 'ga',
        countryCode: 'IE',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Italian',
        languageCode: 'it',
        countryCode: 'IT',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Latvian',
        languageCode: 'lv',
        countryCode: 'LV',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Lithuanian',
        languageCode: 'lt',
        countryCode: 'LT',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Luxembourgish',
        languageCode: 'lb',
        countryCode: 'LU',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Norwegian',
        languageCode: 'no',
        countryCode: 'NO',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Polish',
        languageCode: 'pl',
        countryCode: 'PL',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Portuguese',
        languageCode: 'pt',
        countryCode: 'PT',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Romanian',
        languageCode: 'ro',
        countryCode: 'RO',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Russian',
        languageCode: 'ru',
        countryCode: 'RU',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Serbian',
        languageCode: 'sr',
        countryCode: 'RS',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Slovak',
        languageCode: 'sk',
        countryCode: 'SK',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Slovenia',
        languageCode: 'sl',
        countryCode: 'SI',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Spanish',
        languageCode: 'es',
        countryCode: 'ES',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Swedish',
        languageCode: 'sv',
        countryCode: 'SE',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Turkish',
        languageCode: 'tr',
        countryCode: 'TR',
      },
    }),
    payload.create({
      collection: COLLECTION_SLUG.LANGUAGE,
      data: {
        name: 'Ukrainian',
        languageCode: 'uk',
        countryCode: 'UA',
      },
    }),
  ])
}
