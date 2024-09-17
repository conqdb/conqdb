import { GLOBAL_SLUG } from '@/payload/constants'
import { GlobalConfig } from 'payload'
import { localizedText } from './localizedText'

export const tAuth: GlobalConfig = {
  slug: GLOBAL_SLUG.T_AUTH,
  admin: {
    group: 'Translations',
  },
  label: 'Auth',
  fields: [
    {
      name: 'actions',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('signIn', '50%'), localizedText('signOut', '50%')],
        },
      ],
    },
    {
      name: 'signIn',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [localizedText('subtitle', '50%'), localizedText('signInWithDiscord', '50%')],
        },
        {
          type: 'row',
          fields: [localizedText('legalNotice', '50%'), localizedText('securityConcerns', '50%')],
        },
      ],
    },
  ],
}
