/**
 * TODO:
 * Re-enable server-only when https://github.com/payloadcms/payload/issues/7851 is resolved
 */
// import 'server-only'
import { Lucia } from 'lucia'
import { PayloadAdapterHMR } from './PayloadAdapterHMR'
import { Language, Raid, User as UserType } from '@/payload-types'
import { luciaConfig } from './lucia-config'
import { createValidateRequest } from './createValidateRequest'

const adapter = new PayloadAdapterHMR()

export const lucia = new Lucia(adapter, luciaConfig)

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  discordId: string
  discordUsername: string
  avatar: string
  raid: Raid
  roles: UserType['roles']
  editLanguages: UserType['editLanguages']
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

export const validateRequest = createValidateRequest(lucia)
