import { COLLECTION_SLUG } from '@/payload/constants'
import { CollectionConfig } from 'payload'

export const UserUnit: CollectionConfig = {
  slug: COLLECTION_SLUG.USER_UNIT,
  admin: {
    useAsTitle: 'unit',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: COLLECTION_SLUG.USER,
          required: true,
          maxDepth: 0,
        },
        {
          name: 'unit',
          type: 'relationship',
          relationTo: COLLECTION_SLUG.UNIT,
          required: true,
          maxDepth: 0,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          type: 'select',
          required: true,
          hasMany: false,
          options: [
            {
              label: 'Training',
              value: 'training',
            },
            {
              label: 'Ready',
              value: 'ready',
            },
            {
              label: 'Maxed',
              value: 'maxed',
            },
          ],
        },
      ],
    },
    {
      name: 'favourite',
      type: 'checkbox',
      admin: {},
    },
    {
      name: 'hasLeadershipDoc',
      type: 'checkbox',
    },
    {
      name: 'masteryNodes',
      type: 'number',
    },
  ],
}
