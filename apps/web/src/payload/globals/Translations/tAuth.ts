import { GlobalConfig } from 'payload'
import { localizedText } from './localizedText'
import { access } from '@/payload/access/access'
import { visibleFor } from '@/payload/utils/visibleFor'

export const tAuth: GlobalConfig = {
  slug: 't-auth',
  admin: {
    group: 'Translations',
  },
  label: 'Auth',
  access: {
    read: (args) => access({ args, allowedRoles: ['maintainer', 'translator'] }),
    update: (args) => access({ args, allowedRoles: ['translator'] }),
  },
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
