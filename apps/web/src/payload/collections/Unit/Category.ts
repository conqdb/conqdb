import { COLLECTION_SLUG } from '@/payload/constants'
import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'

export const UnitCategory: CollectionConfig = {
  slug: COLLECTION_SLUG.UNIT_CATEGORY,
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
