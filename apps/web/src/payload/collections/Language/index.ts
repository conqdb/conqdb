import { CollectionConfig } from 'payload'

export const Language: CollectionConfig = {
  slug: 'language',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'languageCode', 'countryCode'],
  },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      admin: {
        description: 'English name of the language',
      },
    },
    {
      name: 'languageCode',
      type: 'text',
      required: true,
      admin: {
        description: 'ISO 639-1 Language Code',
      },
    },
    {
      name: 'countryCode',
      type: 'text',
      admin: {
        description: 'ISO 3166-2 Country Code',
      },
    },
  ],
}
