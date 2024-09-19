import { visibleFor } from '@/payload/utils/visibleFor'
import type { CollectionConfig } from 'payload'
import { generateBlurHash } from './hooks/generateBlurHash'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['filename', 'url', 'mimeType', 'updatedAt'],
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    hidden: (args) => visibleFor(args, ['admin']),
  },
  upload: {
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    formatOptions: {
      format: 'webp',
      options: {
        quality: 100,
      },
    },
    imageSizes: [
      {
        name: 'blur',
        width: 32,
        height: 32,
        fit: 'contain',
        background: 'transparent',
        formatOptions: {
          format: 'png',
        },
      },
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        fit: 'contain',
        background: 'transparent',
        formatOptions: {
          format: 'webp',
          options: {
            quality: 100,
          },
        },
      },
    ],
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [generateBlurHash],
  },
  fields: [
    {
      name: 'blurHash',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
