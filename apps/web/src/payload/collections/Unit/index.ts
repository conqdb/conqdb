import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'
import { setLeadershipDoc } from './hooks/setLeadershipDoc'
import { visibleFor } from '@/payload/utils/visibleFor'
import { access, UserRole } from '@/payload/access/access'
import { canTranslateField } from '@/payload/access/canTranslateField'
import { accessField } from '@/payload/access/accessField'

export const canUpdateUnitsRoles: UserRole[] = ['maintainer']

export const Unit: CollectionConfig = {
  slug: 'unit',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'leadership', 'type', 'category', 'era', 'updatedAt'],
    hidden: (args) => visibleFor(args, ['maintainer', 'translator']),
    group: 'Database',
  },
  access: {
    create: (args) => access({ args, allowedRoles: ['maintainer'] }),
    read: (args) => access({ args, allowedRoles: ['maintainer', 'translator'] }),
    update: (args) => access({ args, allowedRoles: ['maintainer', 'translator'] }),
    delete: (args) => access({ args }),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              localized: true,
              access: {
                update: (args) =>
                  canTranslateField({
                    args,
                    fallback: accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  }),
              },
            },

            {
              name: 'tags',
              type: 'relationship',
              relationTo: 'unit-tag',
              hasMany: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'leadership',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 500,
                  admin: {
                    width: '50%',
                    step: 1,
                  },
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
                {
                  name: 'leadershipDoc',
                  type: 'number',
                  min: 0,
                  max: 500,
                  hooks: {
                    beforeValidate: [setLeadershipDoc],
                  },
                  admin: {
                    width: '50%',
                    step: 1,
                  },
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'stars',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 5,
                  admin: {
                    width: '50%',
                    step: 0.5,
                  },
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
                {
                  name: 'maxLevel',
                  type: 'number',
                  required: true,
                  min: 1,
                  max: 30,
                  admin: {
                    width: '50%',
                    step: 1,
                  },
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'relationship',
                  relationTo: 'unit-type',
                  required: true,
                  admin: {
                    width: '33.333%',
                  },
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: 'unit-category',
                  required: true,
                  admin: {
                    width: '33.333%',
                  },
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
                {
                  name: 'era',
                  type: 'relationship',
                  relationTo: 'unit-era',
                  required: true,
                  admin: {
                    width: '33.333%',
                  },
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              access: {
                update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
              },
            },
            {
              type: 'group',
              name: 'imageSettings',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'x',
                      type: 'number',
                      required: true,
                      defaultValue: 0,
                      access: {
                        update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                      },
                    },
                    {
                      name: 'y',
                      type: 'number',
                      required: true,
                      defaultValue: 0,
                      access: {
                        update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                      },
                    },
                  ],
                },
                {
                  name: 'scale',
                  type: 'number',
                  required: true,
                  defaultValue: 1,
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'mastery',
          fields: [
            {
              type: 'checkbox',
              name: 'hasMastery',
              admin: {
                position: 'sidebar',
              },
              access: {
                update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
              },
            },
            {
              name: 'nodes',
              type: 'array',
              admin: {
                condition: (_, siblingData) => siblingData.hasMastery,
              },
              access: {
                update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                  access: {
                    update: (args) => accessField({ args, allowedRoles: canUpdateUnitsRoles }),
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    slug('name', {
      access: {
        update: (args) => accessField({ args }),
      },
    }),
  ],
}
