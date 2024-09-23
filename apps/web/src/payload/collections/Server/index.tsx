import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const Server: CollectionConfig = {
  slug: 'server',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'code', 'createdAt'],
    hidden: (args) => visibleFor(args, ['maintainer']),
    group: 'Database',
  },
  access: {
    create: (args) => access({ args, allowedRoles: ['maintainer'] }),
    read: (args) => access({ args, allowedRoles: ['maintainer'] }),
    update: (args) => access({ args, allowedRoles: ['maintainer'] }),
    delete: (args) => access({ args, allowedRoles: ['maintainer'] }),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'code',
          type: 'text',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
