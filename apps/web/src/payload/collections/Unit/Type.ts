import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'

export const UnitType: CollectionConfig = {
  slug: 'unit-type',
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
