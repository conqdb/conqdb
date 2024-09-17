import { COLLECTION_SLUG } from '@/payload/constants'
import { CollectionConfig } from 'payload'

export const UnitTag: CollectionConfig = {
  slug: COLLECTION_SLUG.UNIT_TAG,
  admin: {
    hidden: true,
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
