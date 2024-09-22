import { access } from '@/payload/access/access'
import { accessField } from '@/payload/access/accessField'
import { canTranslateField } from '@/payload/access/canTranslateField'
import { slug } from '@/payload/fields/slug'
import { visibleFor } from '@/payload/utils/visibleFor'
import { CollectionConfig } from 'payload'
import { canUpdateUnitsRoles } from '../Unit'

export const Weapon: CollectionConfig = {
  slug: 'weapon',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'slug', 'updatedAt'],
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
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          localized: true,
          admin: {
            width: '50%',
          },
          access: {
            update: (args) =>
              canTranslateField({
                args,
                fallback: accessField({ args, allowedRoles: canUpdateUnitsRoles }),
              }),
          },
        },
        {
          name: 'type',
          type: 'select',
          admin: {
            width: '50%',
          },
          access: {
            update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
          },
          options: [
            {
              label: 'Light Armour',
              value: 'light',
            },
            {
              label: 'Medium Armour',
              value: 'medium',
            },
            {
              label: 'Heavy Armour',
              value: 'heavy',
            },
          ],
        },
      ],
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      access: {
        update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
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
      admin: {
        position: 'sidebar',
      },
      access: {
        update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
      },
    },
  ],
}
