import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'

export const Language: CollectionConfig = {
  slug: 'language',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'languageCode', 'countryCode'],
    group: 'Admin',
    hidden: (args) => visibleFor(args, ['maintainer']),
  },
  defaultSort: 'name',
  access: {
    create: (args) => access({ args, allowedRoles: ['maintainer'] }),
    read: (args) => access({ args, allowedRoles: ['maintainer'] }),
    update: (args) => access({ args, allowedRoles: ['maintainer'] }),
    delete: (args) => access({ args, allowedRoles: ['maintainer'] }),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      unique: true,
      admin: {
        description: 'English name of the language',
      },
    },
    {
      name: 'languageCode',
      type: 'text',
      required: true,
      admin: {
        description: 'ISO 639-1 Language Code',
      },
    },
    {
      name: 'countryCode',
      type: 'text',
      admin: {
        description: 'ISO 3166-2 Country Code',
      },
    },
  ],
}
