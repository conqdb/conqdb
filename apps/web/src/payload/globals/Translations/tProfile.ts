import { GlobalConfig } from 'payload'
import { localizedText } from './localizedText'

export const tProfile: GlobalConfig = {
  slug: 't-profile',
  admin: {
    group: 'Translations',
  },
  label: 'Profile',
  fields: [
    {
      name: 'actions',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            localizedText('createProfile', '33.333%'),
            localizedText('editProfile', '33.333%'),
            localizedText('deleteProfile', '33.333%'),
          ],
        },
      ],
    },
    {
      name: 'responses',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            localizedText('createSuccess', '50%', { label: 'Profile successfully created.' }),
            localizedText('updateSuccess', '50%', { label: 'Profile successfully updated.' }),
          ],
        },
        {
          type: 'row',
          fields: [localizedText('unitAdded', '50%'), localizedText('unitDeleted', '50%')],
        },
      ],
    },
    {
      name: 'create',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('title', '50%'), localizedText('subtitle', '50%')],
        },
      ],
    },
    {
      name: 'username',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('label', '50%'), localizedText('placeholder', '50%')],
        },
        localizedText('description'),
      ],
    },
    {
      name: 'slug',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('label', '50%'), localizedText('placeholder', '50%')],
        },
        localizedText('description'),
        localizedText('slugTaken', '100%', {
          label: 'Slug is already taken',
        }),
      ],
    },
    {
      name: 'language',
      type: 'group',
      fields: [
        {
          name: 'nativeLanguage',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('placeholder', '50%')],
            },
          ],
        },
        {
          name: 'otherLanguages',
          type: 'group',
          fields: [
            {
              type: 'row',
              fields: [localizedText('label', '50%'), localizedText('placeholder', '50%')],
            },
          ],
        },
        localizedText('noLanguageFound'),
      ],
    },
    {
      name: 'leadership',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            localizedText('label', '50%', { label: 'Label: Leadership' }),
            localizedText('description', '50%', {
              label: 'Description: Bonus Leadership for rare (blue) armour sets.',
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            localizedText('light', '33.333%'),
            localizedText('medium', '33.333%'),
            localizedText('heavy', '33.333%'),
          ],
        },
      ],
    },
    {
      name: 'weapons',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('label', '50%'), localizedText('addWeapon', '50%')],
        },
        {
          type: 'row',
          fields: [
            localizedText('leadershipDescription', '50%', {
              label: 'Leadership Description: Bonus leadership for epic (purple) armour sets.',
            }),
            localizedText('leadershipTip', '50%', {
              label: `Entering "0" indicates that you have an epic set without leadership rolls. Remove all numbers if you don't have one.`,
            }),
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [localizedText('raidManager', '50%'), localizedText('exclusiveFeatures', '50%')],
    },
    {
      type: 'group',
      name: 'units',
      fields: [
        {
          type: 'row',
          fields: [
            localizedText('label', '50%', { label: 'Label: Units' }),
            localizedText('dontHaveUnits', '50%', { label: "You don't have any units yet." }),
          ],
        },
        {
          type: 'row',
          fields: [localizedText('addUnit', '50%'), localizedText('addUnits', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('hideOwned', '50%'), localizedText('status', '50%')],
        },
        {
          type: 'row',
          fields: [
            localizedText('favourite', '50%'),
            localizedText('hasLeadershipDoc', '50%', {
              label: 'Has leadership doctrine',
            }),
          ],
        },
        {
          type: 'row',
          fields: [
            localizedText('unlockedMasteryNodes', '50%', {}),
            localizedText('max', '50%', { label: 'Max' }),
          ],
        },
        {
          type: 'group',
          name: 'training',
          fields: [
            {
              type: 'row',
              fields: [
                localizedText('label', '50%', { label: 'Label: Training' }),
                localizedText('description', '50%', {
                  label:
                    'Description: Unlocked, without being fully leveled. Missing important veterancy nodes and good doctrines.',
                }),
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'ready',
          fields: [
            {
              type: 'row',
              fields: [
                localizedText('label', '50%', { label: 'Label: Ready' }),
                localizedText('description', '50%', {
                  label:
                    'Description: Fully, or mostly leveled, with important veterancy nodes and decent doctrines.',
                }),
              ],
            },
          ],
        },
        {
          type: 'group',
          name: 'maxed',
          fields: [
            {
              type: 'row',
              fields: [
                localizedText('label', '50%', { label: 'Label: Maxed' }),
                localizedText('description', '50%', {
                  label:
                    'Description: Fully leveled, with great doctrines and optimal veterancy nodes.',
                }),
              ],
            },
          ],
        },
      ],
    },
  ],
}
