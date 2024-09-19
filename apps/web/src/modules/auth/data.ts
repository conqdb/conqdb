import 'server-only'
import { cache } from 'react'
import config from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { unstable_cache } from 'next/cache'

export const getSessionById = cache(async (sessionId: string) => {
  return unstable_cache(
    async (sessionId) => {
      const payload = await getPayloadHMR({ config })
      const session = await payload.findByID({ collection: 'session', id: sessionId })
      return session
    },
    [`${'session'}:${sessionId}`],
    { tags: ['session', `${'session'}:${sessionId}`] },
  )
})
