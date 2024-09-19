import { GlobalConfig } from 'payload'
import { localizedText } from './localizedText'

export const tCommon: GlobalConfig = {
  slug: 't-common',
  admin: {
    group: 'Translations',
  },
  label: 'Common',
  fields: [
    {
      name: 'actions',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('save', '50%'), localizedText('cancel', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('confirm', '50%'), localizedText('preview', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('delete', '50%'), localizedText('remove', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('copy', '50%'), localizedText('copied', '50%')],
        },
      ],
    },
    {
      name: 'responses',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('success', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('error', '50%'), localizedText('somethingWentWrong', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('notFound', '50%'), localizedText('nothingFound', '50%')],
        },
        {
          type: 'row',
          fields: [
            localizedText('mustBeLoggedIn', '50%'),
            localizedText('fieldsAreInvalid', '50%'),
          ],
        },
      ],
    },
    {
      name: 'warning',
      type: 'group',
      fields: [
        localizedText('label', '100%', { label: 'Warning' }),
        localizedText('unsavedChanges', '100%', {
          label: 'You have unsaved changes. Are you sure you want to discard them?',
        }),
        localizedText('delete', '100%', {
          label: 'Are you sure you want to delete this? It cannot be undone.',
        }),
      ],
    },
  ],
}
