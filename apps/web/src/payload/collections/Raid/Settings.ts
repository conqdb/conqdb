import { CollectionConfig } from 'payload'
import { permissionsFields } from './fields/permissionsFields'
import { visibleFor } from '@/payload/utils/visibleFor'
import { access } from '@/payload/access/access'

export const RaidSettings: CollectionConfig = {
  slug: 'raid-settings',
  admin: {
    hidden: (args) => visibleFor(args, ['admin']),
    useAsTitle: 'raid',
    defaultColumns: ['raid', 'owner', 'createdAt', 'updatedAt'],
    group: 'Dashboard',
  },
  access: {
    create: (args) => access({ args }),
    read: (args) => access({ args }),
    update: (args) => access({ args }),
    delete: (args) => access({ args }),
  },
  fields: [
    {
      name: 'raid',
      type: 'relationship',
      relationTo: 'raid',
      unique: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'user',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'permissions',
      type: 'group',
      fields: [
        {
          name: 'leader',
          type: 'group',
          fields: permissionsFields({ defaultValues: { member: { read: true, manage: true } } }),
        },
        {
          name: 'officer',
          type: 'group',
          fields: permissionsFields({ defaultValues: { member: { read: true } } }),
        },
        {
          name: 'member',
          type: 'group',
          fields: permissionsFields({ defaultValues: { member: { read: true } } }),
        },
      ],
    },
  ],
}
