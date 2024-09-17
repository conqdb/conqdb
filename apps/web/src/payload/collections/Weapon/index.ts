import { COLLECTION_SLUG } from '@/payload/constants'
import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'

export const Weapon: CollectionConfig = {
  slug: COLLECTION_SLUG.WEAPON,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'slug', 'updatedAt'],
  },
  defaultSort: 'weight',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'type',
          type: 'select',
          admin: {
            width: '50%',
          },
          options: [
            {
              label: 'Light Armour',
              value: 'light',
            },
            {
              label: 'Medium Armour',
              value: 'medium',
            },
            {
              label: 'Heavy Armour',
              value: 'heavy',
            },
          ],
        },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: COLLECTION_SLUG.MEDIA,
    },
    slug('name'),
    {
      name: 'weight',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
