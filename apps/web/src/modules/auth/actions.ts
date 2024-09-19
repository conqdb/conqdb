'use server'

import { lucia, validateRequest } from '@/lib/lucia'
import { createDiscordAuthorizationUrl } from '@/lib/lucia/discordProvider'
import { cookies } from 'next/headers'
import { redirect } from '@/navigation'
import { redirect as nextRedirect } from 'next/navigation'

export const login = async ({ redirectTo }: { redirectTo?: string } = {}) => {
  if (redirectTo) {
    cookies().set('redirectTo', redirectTo, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 10,
      sameSite: 'lax',
    })
  }

  const url = await createDiscordAuthorizationUrl()

  return { url }
}

export const logout = async ({
  redirectTo,
  nativeRedirect = false,
}: { redirectTo?: string; nativeRedirect?: boolean } = {}) => {
  const { session } = await validateRequest()

  if (!session) {
    return {
      error: 'Unauthorized',
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  if (redirectTo) {
    nativeRedirect ? nextRedirect(redirectTo) : redirect(redirectTo)
  }

  return {
    error: null,
  }
}
