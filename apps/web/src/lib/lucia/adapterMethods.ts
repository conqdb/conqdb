import { Session, User } from '@/payload-types'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'
import { DatabaseSession, DatabaseUser, UserId } from 'lucia'
import { unstable_cache } from 'next/cache'
import { Payload } from 'payload'
import { cache } from 'react'

function transformIntoDatabaseSession(raw: Session): DatabaseSession {
  const { id, user, expiresAt, ...attributes } = raw

  return {
    id,
    userId: typeof user === 'object' ? user.id : user,
    expiresAt: new Date(expiresAt),
    attributes,
  }
}

function transformIntoDatabaseUser(raw: User): DatabaseUser {
  const { id, ...attributes } = raw
  return {
    id,
    /** @ts-ignore */
    attributes,
  }
}

export const deleteSessionMethod = async (payload: Payload, sessionId: string): Promise<void> => {
  await payload.delete({
    collection: 'session',
    where: {
      id: {
        equals: sessionId,
      },
    },
  })
  return
}

export const deleteUserSessionsMethod = async (payload: Payload, userId: UserId): Promise<void> => {
  await payload.delete({
    collection: 'session',
    where: {
      userId: {
        equals: userId,
      },
    },
  })
  return
}

export const getSessionAndUserMethod = async (
  payload: Payload,
  sessionId: string,
): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> => {
  try {
    const getSession = unstable_cache(
      async (sessionId) => {
        return await payload.findByID({
          collection: 'session',
          id: sessionId,
          disableErrors: true,
        })
      },
      ['session'],
      { tags: ['session', `session:${sessionId}`] },
    )

    const session = await getSession(sessionId)

    if (!session || typeof session?.user !== 'object') {
      return [null, null]
    }

    return [transformIntoDatabaseSession(session), transformIntoDatabaseUser(session.user)]
  } catch (error) {
    return [null, null]
  }
}

export const getUserSessionsMethod = async (payload: Payload, userId: string) => {
  const result = await payload.find({
    collection: 'session',
    where: {
      user: {
        equals: userId,
      },
    },
  })

  return result?.docs?.map((session) => {
    return transformIntoDatabaseSession(session)
  })
}

export const setSessionMethod = async (
  payload: Payload,
  session: DatabaseSession,
): Promise<void> => {
  await payload.create({
    collection: 'session',
    data: {
      id: session.id,
      user: session.userId,
      expiresAt: session.expiresAt.toISOString(),
      ...session.attributes,
    },
  })
  return
}

export const updateSessionExpirationMethod = async (
  payload: Payload,
  sessionId: string,
  expiresAt: Date,
): Promise<void> => {
  await payload.update({
    collection: 'session',
    id: sessionId,
    data: {
      expiresAt: expiresAt.toISOString(),
    },
  })
  return
}

/**
 * Todo: test the Where operation
 */
export const deleteExpiredSessionsMethod = async (payload: Payload): Promise<void> => {
  await payload.delete({
    collection: 'session',
    where: {
      expiresAt: {
        less_than_equal: new Date(),
      },
    },
  })
  return
}
