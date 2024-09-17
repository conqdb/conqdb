import { access } from '@/payload/access/access'
import { COLLECTION_SLUG } from '@/payload/constants'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const Raid: CollectionConfig = {
  slug: COLLECTION_SLUG.RAID,
  labels: {
    singular: 'Raid',
    plural: 'Raids',
  },
  admin: {
    hidden: (args) => visibleFor(args, ['admin']),
    useAsTitle: 'name',
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
      name: 'name',
      type: 'text',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: COLLECTION_SLUG.USER,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'server',
      type: 'relationship',
      relationTo: COLLECTION_SLUG.SERVER,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
