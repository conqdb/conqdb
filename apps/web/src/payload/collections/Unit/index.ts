import { COLLECTION_SLUG } from '@/payload/constants'
import { slug } from '@/payload/fields/slug'
import { CollectionConfig } from 'payload'
import { setLeadershipDoc } from './hooks/setLeadershipDoc'

export const Unit: CollectionConfig = {
  slug: COLLECTION_SLUG.UNIT,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'leadership', 'type', 'category', 'era', 'updatedAt'],
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
            },

            {
              name: 'tags',
              type: 'relationship',
              relationTo: COLLECTION_SLUG.UNIT_TAG,
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
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'type',
                  type: 'relationship',
                  relationTo: COLLECTION_SLUG.UNIT_TYPE,
                  required: true,
                  admin: {
                    width: '33.333%',
                  },
                },
                {
                  name: 'category',
                  type: 'relationship',
                  relationTo: COLLECTION_SLUG.UNIT_CATEGORY,
                  required: true,
                  admin: {
                    width: '33.333%',
                  },
                },
                {
                  name: 'era',
                  type: 'relationship',
                  relationTo: COLLECTION_SLUG.UNIT_ERA,
                  required: true,
                  admin: {
                    width: '33.333%',
                  },
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: COLLECTION_SLUG.MEDIA,
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
                    },
                    {
                      name: 'y',
                      type: 'number',
                      required: true,
                      defaultValue: 0,
                    },
                  ],
                },
                {
                  name: 'scale',
                  type: 'number',
                  required: true,
                  defaultValue: 1,
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
            },
            {
              name: 'nodes',
              type: 'array',
              admin: {
                condition: (_, siblingData) => siblingData.hasMastery,
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },
    slug('name'),
  ],
}
