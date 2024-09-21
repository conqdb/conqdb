import { createValidateRequest } from '@/lib/lucia/createValidateRequest'
import { luciaConfig } from '@/lib/lucia/lucia-config'
import { PayloadAdapter } from '@/lib/lucia/PayloadAdapter'
import { Lucia } from 'lucia'
import { AuthStrategy } from 'payload'

export const luciaStrategy: AuthStrategy = {
  name: 'discord',
  authenticate: async ({ payload }) => {
    const adapter = new PayloadAdapter(payload)
    const lucia = new Lucia(adapter, luciaConfig)
    const validateRequest = createValidateRequest(lucia)
    const { user } = await validateRequest()
    return {
      user: user ? { ...user, collection: 'user' } : null,
    }
  },
}
