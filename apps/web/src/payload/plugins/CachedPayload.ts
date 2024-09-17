import { buildCachedPayload } from '@payload-enchants/cached-local-api'
import { COLLECTION_SLUG, GLOBAL_SLUG } from '../constants'
import { revalidateTag, unstable_cache } from 'next/cache'

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
  collections: [
    {
      slug: COLLECTION_SLUG.SESSION,
    },
    {
      slug: COLLECTION_SLUG.USER,
      findOneFields: ['slug'],
    },
    {
      slug: COLLECTION_SLUG.LANGUAGE,
    },
    {
      slug: COLLECTION_SLUG.WEAPON,
    },
    {
      slug: COLLECTION_SLUG.UNIT,
    },
    {
      slug: COLLECTION_SLUG.USER_UNIT,
    },
  ],
  globals: [
    {
      slug: GLOBAL_SLUG.T_COMMON,
    },
    {
      slug: GLOBAL_SLUG.T_AUTH,
    },
    {
      slug: GLOBAL_SLUG.T_NAVIGATION,
    },
    {
      slug: GLOBAL_SLUG.T_PROFILE,
    },
    {
      slug: GLOBAL_SLUG.T_VALIDATION,
    },
  ],
  loggerDebug: false,
  revalidateTag,
  unstable_cache,
})
