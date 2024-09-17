import { COLLECTION_SLUG } from '@/payload/constants'
import { CollectionConfig } from 'payload'

export const Server: CollectionConfig = {
  slug: COLLECTION_SLUG.SERVER,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'createdAt'],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'code',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
