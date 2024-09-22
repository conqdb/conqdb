import { canTranslateField } from '@/payload/access/canTranslateField'
import { deepMerge } from '@/payload/utils/deepMerge'
import { Field } from 'payload'

type LocalizedText = (fieldName: string, width?: string, overrides?: Partial<Field>) => Field

export const localizedText: LocalizedText = (fieldName, width = '100%', overrides = {}) =>
  deepMerge<Field, Partial<Field>>(
    {
      name: fieldName,
      type: 'text',
      localized: true,
      defaultValue: '',
      admin: {
        width,
      },
      access: {
        update: (args) => canTranslateField({ args }),
      },
    },
    overrides,
  )
