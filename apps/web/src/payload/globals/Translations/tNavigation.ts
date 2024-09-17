import { GLOBAL_SLUG } from '@/payload/constants'
import { GlobalConfig } from 'payload'
import { localizedText } from './localizedText'

export const tNavigation: GlobalConfig = {
  slug: GLOBAL_SLUG.T_NAVIGATION,
  admin: {
    group: 'Translations',
  },
  label: 'Navigation',
  fields: [
    {
      name: 'news',
      type: 'group',
      fields: [localizedText('label')],
    },
    {
      name: 'units',
      type: 'group',
      fields: [
        localizedText('label'),
        {
          name: 'allUnits',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
        {
          name: 'doctrines',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
        {
          name: 'guides',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
        {
          name: 'tierList',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
      ],
    },
    {
      name: 'weapons',
      type: 'group',
      fields: [
        localizedText('label'),
        {
          name: 'allWeapons',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
        {
          name: 'guides',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
        {
          name: 'tierList',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
      ],
    },
    {
      name: 'tools',
      type: 'group',
      fields: [
        localizedText('label'),
        {
          name: 'leadershipCalculator',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
        {
          name: 'unitXpCalculator',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
        {
          name: 'scrimPlanner',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('description', '50%')],
            },
          ],
        },
      ],
    },
    {
      name: 'actions',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            localizedText('switchLanguage', '50%'),
            localizedText('toggleColorScheme', '50%'),
          ],
        },
      ],
    },
    {
      name: 'menu',
      type: 'group',
      fields: [
        localizedText('notifications'),
        {
          type: 'row',
          fields: [localizedText('profile', '50%'), localizedText('createProfile', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('joinRaid', '50%'), localizedText('createRaid', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('dashboard', '50%'), localizedText('translate', '50%')],
        },
      ],
    },
  ],
}
