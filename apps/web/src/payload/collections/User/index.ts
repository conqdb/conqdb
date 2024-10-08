import type { CollectionConfig } from 'payload'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { visibleFor } from '@/payload/utils/visibleFor'
import { syncDiscordFields } from './hooks/syncDiscordFields'
import { syncRaidMembership } from './hooks/syncRaidMembership'
import { luciaStrategy } from './luciaStrategy'
import { revalidateUserAfterChange, revalidateUserAfterDelete } from './hooks/revalidateUser'
import { locales } from '@/payload/locales'
import { access } from '@/payload/access/access'

export const User: CollectionConfig = {
  slug: 'user',
  admin: {
    useAsTitle: 'username',
    defaultColumns: [
      'username',
      'discordUsername',
      'roles',
      'nativeLanguage',
      'createdAt',
      'updatedAt',
    ],
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    group: 'Admin',
    hidden: (args) => visibleFor(args, ['admin']),
  },
  hooks: {
    beforeValidate: [syncDiscordFields],
    beforeDelete: [
      ({ context }) => {
        if (!context.source) {
          context.source = `delete-user`
        }
        return
      },
    ],
    afterChange: [revalidateUserAfterChange],
    afterDelete: [revalidateUserAfterDelete],
  },
  auth: {
    disableLocalStrategy: true,
    strategies: [luciaStrategy],
  },
  access: {
    create: (args) => access({ args }),
    read: (args) =>
      access({ args, query: args.req.user ? { id: { equals: args.req.user.id } } : undefined }),
    update: (args) => access({ args }),
    delete: (args) => access({ args }),
    admin: (args) => {
      return Boolean(
        args.req.user &&
          (args.req.user.roles?.includes('admin') ||
            args.req.user.roles?.includes('maintainer') ||
            args.req.user.roles?.includes('translator')),
      )
    },
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'username',
          type: 'text',
          index: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'level',
          type: 'number',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'nativeLanguage',
          type: 'relationship',
          relationTo: 'language',
          hasMany: false,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'otherLanguages',
          type: 'relationship',
          relationTo: 'language',
          hasMany: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'lightLeadership',
          type: 'number',
          admin: {
            description: 'For blue schematics',
            width: '33.333%',
          },
        },
        {
          name: 'mediumLeadership',
          type: 'number',
          admin: {
            description: 'For blue schematics',
            width: '33.333%',
          },
        },
        {
          name: 'heavyLeadership',
          type: 'number',
          admin: {
            description: 'For blue schematics',
            width: '33.333%',
          },
        },
      ],
    },
    {
      type: 'array',
      name: 'weapons',
      fields: [
        {
          name: 'weapon',
          type: 'relationship',
          relationTo: 'weapon',
          hasMany: false,
        },
        {
          name: 'leadership',
          type: 'number',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'discordId',
      index: true,
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'discordUsername',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'avatar',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'raid',
      type: 'relationship',
      relationTo: 'raid',
      hooks: {
        beforeChange: [syncRaidMembership],
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['user'],
      hooks: {
        beforeValidate: [ensureFirstUserIsAdmin],
      },
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Banned',
          value: 'banned',
        },
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Member',
          value: 'member',
        },
        {
          label: 'Translator',
          value: 'translator',
        },
        {
          label: 'Maintainer',
          value: 'maintainer',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
    {
      name: 'editLanguages',
      type: 'select',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
      options: locales.map((locale) => {
        return {
          value: locale.code,
          label: locale.label,
        }
      }),
    },
    {
      name: 'metadata',
      type: 'json',
      hidden: true,
    },
  ],
}
