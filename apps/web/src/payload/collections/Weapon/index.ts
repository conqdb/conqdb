import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'

export const Weapon: CollectionConfig = {
  slug: 'weapon',
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
      relationTo: 'media',
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
