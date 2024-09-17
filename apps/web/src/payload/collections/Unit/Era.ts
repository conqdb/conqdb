import { COLLECTION_SLUG } from '@/payload/constants'
import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'

export const UnitEra: CollectionConfig = {
  slug: COLLECTION_SLUG.UNIT_ERA,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
  },
  defaultSort: 'weight',
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
    },
    slug('name'),
    {
      name: 'weight',
      type: 'number',
    },
  ],
}
