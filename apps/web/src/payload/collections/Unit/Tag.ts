import { CollectionConfig } from 'payload'

export const UnitTag: CollectionConfig = {
  slug: 'unit-tag',
  admin: {
    hidden: true,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
