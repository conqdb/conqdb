import { COLLECTION_SLUG } from '@/payload/constants'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const Session: CollectionConfig = {
  slug: COLLECTION_SLUG.SESSION,
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
      relationTo: COLLECTION_SLUG.USER,
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
    },
  ],
}
