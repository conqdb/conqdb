import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const UnitTag: CollectionConfig = {
  slug: 'unit-tag',
  admin: {
    hidden: true,
    useAsTitle: 'name',
  },
  access: {
    create: (args) => access({ args, allowedRoles: ['maintainer', 'translator'] }),
    read: (args) => access({ args, allowedRoles: ['maintainer', 'translator'] }),
    update: (args) => access({ args, allowedRoles: ['maintainer'] }),
    delete: (args) => access({ args }),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
  ],
}
