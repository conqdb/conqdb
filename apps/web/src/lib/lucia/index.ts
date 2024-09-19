/**
 * TODO:
 * Re-enable server-only when https://github.com/payloadcms/payload/issues/7851 is resolved
 */
// import 'server-only'
import { Lucia, User, Session } from 'lucia'
import { PayloadAdapter } from './payloadAdapter'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { Language, Raid, User as UserType } from '@/payload-types'

const adapter = PayloadAdapter.create()

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      collection: 'user',
      discordId: attributes.discordId,
      discordUsername: attributes?.discordUsername,
      avatar: attributes?.avatar,
      raid: attributes?.raid,
      roles: attributes.roles,
      username: attributes.username,
      slug: attributes.slug,
      level: attributes.level,
      nativeLanguage: attributes.nativeLanguage,
      otherLanguages: attributes.otherLanguages,
      lightLeadership: attributes.lightLeadership,
      mediumLeadership: attributes.mediumLeadership,
      heavyLeadership: attributes.heavyLeadership,
      weapons: attributes.weapons,
    }
  },
})

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  collection: string
  discordId: string
  discordUsername: string
  avatar: string
  raid: Raid
  roles: UserType['roles']
  username: string
  slug: string
  level: number
  nativeLanguage: Language
  otherLanguages: Language[]
  lightLeadership: number
  mediumLeadership: number
  heavyLeadership: number
  weapons: UserType['weapons']
}

export const validateRequest = cache(
  async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null

    if (!sessionId) {
      return {
        user: null,
        session: null,
      }
    }

    const result = await lucia.validateSession(sessionId)

    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id)
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie()
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
      }
    } catch {}
    return result
  },
)
