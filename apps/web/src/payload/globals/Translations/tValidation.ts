import { GLOBAL_SLUG } from '@/payload/constants'
import { GlobalConfig } from 'payload'
import { localizedText } from './localizedText'

export const tValidation: GlobalConfig = {
  slug: GLOBAL_SLUG.T_VALIDATION,
  admin: {
    group: 'Translations',
  },
  label: 'Validation',
  fields: [
    {
      type: 'row',
      fields: [localizedText('invalid', '50%'), localizedText('required', '50%')],
    },
    {
      type: 'row',
      fields: [localizedText('minChar', '50%'), localizedText('maxChar', '50%')],
    },
    {
      type: 'row',
      fields: [localizedText('minNum', '50%'), localizedText('maxNum', '50%')],
    },
  ],
}
