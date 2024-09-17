import 'server-only'
import { cache } from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'
import { COLLECTION_SLUG } from '@/payload/constants'

export const getSessionById = cache(async (sessionId: string) => {
  return unstable_cache(
    async (sessionId) => {
      const payload = await getPayloadHMR({ config })
      const session = await payload.findByID({ collection: COLLECTION_SLUG.SESSION, id: sessionId })
      return session
    },
    [`${COLLECTION_SLUG.SESSION}:${sessionId}`],
    { tags: [COLLECTION_SLUG.SESSION, `${COLLECTION_SLUG.SESSION}:${sessionId}`] },
  )
})
