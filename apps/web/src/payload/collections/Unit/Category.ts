import { access } from '@/payload/access/access'
import { accessField } from '@/payload/access/accessField'
import { canTranslateField } from '@/payload/access/canTranslateField'
import { slug } from '@/payload/fields/slug'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'
import { canUpdateUnitsRoles } from '.'

export const UnitCategory: CollectionConfig = {
  slug: 'unit-category',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'createdAt', 'updatedAt'],
    group: 'Database',
    hidden: (args) => visibleFor(args, ['maintainer', 'translator']),
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
