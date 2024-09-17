import { COLLECTION_SLUG } from '@/payload/constants'
import { CollectionConfig } from 'payload'
import { generateInviteCode } from './hooks/generateInviteCode'
import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'

export const RaidInvite: CollectionConfig = {
  slug: COLLECTION_SLUG.RAID_INVITE,
  admin: {
    hidden: (args) => visibleFor(args, ['admin']),
    useAsTitle: 'code',
    defaultColumns: ['code', 'raid', 'expires', 'createdAt'],
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
      required: true,
      relationTo: COLLECTION_SLUG.RAID,
      maxDepth: 0,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [generateInviteCode],
      },
    },
    {
      name: 'conditions',
      type: 'json',
    },
    {
      name: 'expires',
      type: 'date',
      admin: {
        date: {
          minDate: new Date(),
        },
      },
    },
  ],
}
