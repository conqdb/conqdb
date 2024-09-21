import { getPayloadHMR } from '@payloadcms/next/utilities'
import type { Adapter, DatabaseSession, DatabaseUser, UserId } from 'lucia'
import config from '@/payload.config'
import {
  deleteExpiredSessionsMethod,
  deleteSessionMethod,
  deleteUserSessionsMethod,
  getSessionAndUserMethod,
  getUserSessionsMethod,
  setSessionMethod,
  updateSessionExpirationMethod,
} from './adapterMethods'

export class PayloadAdapterHMR implements Adapter {
  public async deleteSession(sessionId: string): Promise<void> {
    const payload = await getPayloadHMR({ config })
    return await deleteSessionMethod(payload, sessionId)
  }

  public async deleteUserSessions(userId: UserId): Promise<void> {
    const payload = await getPayloadHMR({ config })
    return await deleteUserSessionsMethod(payload, userId)
  }

  public async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const payload = await getPayloadHMR({ config })
    return await getSessionAndUserMethod(payload, sessionId)
  }

  public async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    const payload = await getPayloadHMR({ config })
    return await getUserSessionsMethod(payload, userId)
  }

  public async setSession(session: DatabaseSession): Promise<void> {
    const payload = await getPayloadHMR({ config })
    return setSessionMethod(payload, session)
  }

  public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    const payload = await getPayloadHMR({ config })
    return updateSessionExpirationMethod(payload, sessionId, expiresAt)
  }

  /**
   * Todo: test the Where operation
   */
  public async deleteExpiredSessions(): Promise<void> {
    const payload = await getPayloadHMR({ config })
    return await deleteExpiredSessionsMethod(payload)
  }
}
