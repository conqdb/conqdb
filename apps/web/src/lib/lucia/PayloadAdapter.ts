import { Adapter, DatabaseSession, DatabaseUser, UserId } from 'lucia'
import { Payload } from 'payload'
import {
  deleteExpiredSessionsMethod,
  deleteSessionMethod,
  deleteUserSessionsMethod,
  getSessionAndUserMethod,
  getUserSessionsMethod,
  setSessionMethod,
  updateSessionExpirationMethod,
} from './adapterMethods'

export class PayloadAdapter implements Adapter {
  private payload: Payload | null = null

  public constructor(payload: Payload) {
    this.payload = payload
  }

  public async deleteSession(sessionId: string): Promise<void> {
    return await deleteSessionMethod(this.payload!, sessionId)
  }

  public async deleteUserSessions(userId: UserId): Promise<void> {
    return await deleteUserSessionsMethod(this.payload!, userId)
  }

  public async getSessionAndUser(
    sessionId: string,
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    return await getSessionAndUserMethod(this.payload!, sessionId)
  }

  public async getUserSessions(userId: string): Promise<DatabaseSession[]> {
    return await getUserSessionsMethod(this.payload!, userId)
  }

  public async setSession(session: DatabaseSession): Promise<void> {
    return setSessionMethod(this.payload!, session)
  }

  public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
    return updateSessionExpirationMethod(this.payload!, sessionId, expiresAt)
  }

  public async deleteExpiredSessions(): Promise<void> {
    return deleteExpiredSessionsMethod(this.payload!)
  }
}
