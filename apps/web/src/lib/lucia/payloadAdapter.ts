import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Adapter, DatabaseSession, DatabaseUser, UserId } from 'lucia'
import { Payload } from 'payload'
import config from '@/payload.config'
import { getCachedPayload } from '@/payload/plugins/CachedPayload'
import type { CachedPayload } from '@payload-enchants/cached-local-api'
import { Session, User } from '@/payload-types'

export class PayloadAdapter implements Adapter {
  private payload: Payload | null = null
  private cachedPayload: CachedPayload | null = null
  private initialized: boolean = false

  private constructor() {}

  private async initialize() {
    if (!this.initialized) {
      this.payload = await getPayloadHMR({ config })
      this.cachedPayload = getCachedPayload(this.payload)
      this.initialized = true
    }
  }

  public static create(): PayloadAdapter {
    const adapter = new PayloadAdapter()

    return new Proxy(adapter, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver)
        if (typeof value === 'function') {
          return async (...args: any[]) => {
            await target.initialize()
            return (value as Function).apply(target, args)
          }
        }
        return value
      },
    })
  }

  public async deleteSession(sessionId: string): Promise<void> {
    await this.payload!.delete({
      collection: 'session',
      where: {
        id: {
          equals: sessionId,
        },
      },
    })
  }

  public async deleteUserSessions(userId: UserId): Promise<void> {
    await this.payload!.delete({
      collection: 'session',
      where: {
        userId: {
          equals: userId,
        },
      },
    })
  }

  public async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    try {
      const session = await this.cachedPayload?.findByID({
        collection: 'session',
        id: sessionId,
        disableErrors: true,
      })

      if (!session || typeof session?.user !== 'object') {
        return [null, null]
      }

      return [transformIntoDatabaseSession(session), transformIntoDatabaseUser(session.user)]
    } catch (error) {
      return [null, null]
    }
  }

  public async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const result = await this.cachedPayload!.find({
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

  public async setSession(session: DatabaseSession): Promise<void> {
    await this.payload!.create({
      collection: 'session',
      data: {
        id: session.id,
        user: session.userId,
        expiresAt: session.expiresAt.toISOString(),
        ...session.attributes,
      },
    })
  }

  public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    await this.payload!.update({
      collection: 'session',
      id: sessionId,
      data: {
        expiresAt: expiresAt.toISOString(),
      },
    })
  }

  /**
   * Todo: test the Where operation
   */
  public async deleteExpiredSessions(): Promise<void> {
    await this.payload!.delete({
      collection: 'session',
      where: {
        expiresAt: {
          less_than_equal: new Date(),
        },
      },
    })
  }
}

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
