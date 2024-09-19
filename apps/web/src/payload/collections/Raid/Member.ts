import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'
import { handleMemberRole } from './hooks/handleMemberRole'
import { handleMemberDelete } from './hooks/handleMemberDelete'

export const RaidMember: CollectionConfig = {
  slug: 'raid-member',
  admin: {
    useAsTitle: 'raid',
    defaultColumns: ['user', 'raid', 'role', 'createdAt', 'updatedAt'],
    hidden: (args) => visibleFor(args, ['admin']),
    group: 'Dashboard',
  },
  access: {
    create: (args) => access({ args }),
    read: (args) => access({ args }),
    update: (args) => access({ args }),
    delete: (args) => access({ args }),
  },
  hooks: {
    afterDelete: [handleMemberDelete],
  },
  fields: [
    {
      name: 'raid',
      type: 'relationship',
      relationTo: 'raid',
      required: true,
      hasMany: false,
      maxDepth: 0,
      admin: {
        position: 'sidebar',
        allowCreate: false,
      },
      access: {
        update: () => false,
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'user',
      required: true,
      hasMany: false,
      maxDepth: 0,
      admin: {
        position: 'sidebar',
        allowCreate: false,
      },
      access: {
        update: () => false,
      },
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'member',
      required: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [handleMemberRole],
      },
      options: [
        {
          label: 'Leader',
          value: 'leader',
        },
        {
          label: 'Officer',
          value: 'officer',
        },
        {
          label: 'Member',
          value: 'member',
        },
        {
          label: 'Alumni',
          value: 'alumni',
        },
        {
          label: 'Banned',
          value: 'banned',
        },
      ],
    },
  ],
}
