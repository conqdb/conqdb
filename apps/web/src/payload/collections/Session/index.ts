import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const Session: CollectionConfig = {
  slug: 'session',
  admin: {
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    hidden: (args) => visibleFor(args, ['admin']),
  },
  // access: {},
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
