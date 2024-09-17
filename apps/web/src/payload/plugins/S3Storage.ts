import { s3Storage } from '@payloadcms/storage-s3'
import { COLLECTION_SLUG } from '../constants'

export const S3Storage = s3Storage({
  enabled: process.env.S3_ACCESS_KEY ? true : false,
  collections: {
    [COLLECTION_SLUG.MEDIA]: {
      prefix: COLLECTION_SLUG.MEDIA,
    },
  },
  bucket: process.env.S3_BUCKET ?? '',
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY ?? '',
      secretAccessKey: process.env.S3_SECRET_KEY ?? '',
    },
    endpoint: process.env.S3_ENDPOINT ?? '',
    region: process.env.S3_REGION ?? '',
    forcePathStyle: true,
  },
})
