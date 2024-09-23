import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const Session: CollectionConfig = {
  slug: 'session',
  admin: {
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    group: 'Admin',
    hidden: (args) => visibleFor(args, ['admin']),
  },
  access: {
    create: (args) => access({ args }),
    read: (args) => access({ args }),
    update: (args) => access({ args }),
    delete: (args) => access({ args }),
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      index: true,
      unique: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'user',
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
    },
  ],
}
