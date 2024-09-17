import { access } from '@/payload/access/access'
import { COLLECTION_SLUG } from '@/payload/constants'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'
import { handleMemberRole } from './hooks/handleMemberRole'
import { handleMemberDelete } from './hooks/handleMemberDelete'

export const RaidMember: CollectionConfig = {
  slug: COLLECTION_SLUG.RAID_MEMBER,
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
      relationTo: COLLECTION_SLUG.RAID,
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
      relationTo: COLLECTION_SLUG.USER,
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
