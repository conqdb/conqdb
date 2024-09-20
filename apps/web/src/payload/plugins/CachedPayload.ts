import { buildCachedPayload } from '@payload-enchants/cached-local-api'
import { revalidateTag, unstable_cache } from 'next/cache'

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
  collections: [
    {
      slug: 'session',
    },
    {
      slug: 'user',
      findOneFields: ['slug'],
    },
    {
      slug: 'language',
    },
    {
      slug: 'weapon',
    },
    {
      slug: 'unit',
    },
    {
      slug: 'unit-type',
    },
    {
      slug: 'unit-category',
    },
    {
      slug: 'unit-era',
    },
    {
      slug: 'user-unit',
    },
  ],
  globals: [
    {
      slug: 't-common',
    },
    {
      slug: 't-auth',
    },
    {
      slug: 't-navigation',
    },
    {
      slug: 't-profile',
    },
    {
      slug: 't-validation',
    },
  ],
  loggerDebug: process.env.ANALYZE === 'true',
  revalidateTag,
  unstable_cache,
})
