import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const UserUnit: CollectionConfig = {
  slug: 'user-unit',
  admin: {
    useAsTitle: 'unit',
    hidden: (args) => visibleFor(args, ['admin']),
    group: 'Admin',
  },
  access: {
    create: (args) => access({ args }),
    read: (args) => access({ args }),
    update: (args) => access({ args }),
    delete: (args) => access({ args }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'user',
          type: 'relationship',
          relationTo: 'user',
          required: true,
          maxDepth: 0,
        },
        {
          name: 'unit',
          type: 'relationship',
          relationTo: 'unit',
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
