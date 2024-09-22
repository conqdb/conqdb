import { accessField } from '@/payload/access/accessField'
import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'
import { canUpdateUnitsRoles } from '.'
import { canTranslateField } from '@/payload/access/canTranslateField'
import { access } from '@/payload/access/access'

export const UnitEra: CollectionConfig = {
  slug: 'unit-era',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
    group: 'Database',
  },
  defaultSort: 'weight',
  access: {
    create: (args) => access({ args, allowedRoles: ['maintainer'] }),
    read: (args) => access({ args, allowedRoles: ['maintainer', 'translator'] }),
    update: (args) => access({ args, allowedRoles: ['maintainer', 'translator'] }),
    delete: (args) => access({ args }),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      access: {
        update: (args) =>
          canTranslateField({
            args,
            fallback: accessField({ args, allowedRoles: canUpdateUnitsRoles }),
          }),
      },
    },
    slug('name', {
      access: {
        update: (args) => accessField({ args }),
      },
    }),
    {
      name: 'weight',
      type: 'number',
      access: {
        update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
      },
    },
  ],
}
