import { getPayloadHMR } from '@payloadcms/next/utilities'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import config from '@payload-config'
import { OAuth2RequestError } from 'arctic'
import { getDiscordUser } from '@/lib/lucia/discordProvider'
import { lucia } from '@/lib/lucia'

export async function GET(request: NextRequest): Promise<Response> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const storedState = cookies().get('oauth-state')?.value ?? null

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400, statusText: 'Invalid OAuth State' })
  }

  try {
    const payload = await getPayloadHMR({ config })

    const discordUser = await getDiscordUser(code)

    const existingUser = await payload.find({
      collection: 'user',
      where: {
        discordId: {
          equals: discordUser.id,
        },
      },
    })

    let user = existingUser?.docs[0]

    if (!user) {
      user = await payload.create({
        collection: 'user',
        data: {
          discordId: discordUser.id,
          roles: ['user'],
          metadata: discordUser,
        },
      })
    } else {
      await payload.update({
        collection: 'user',
        id: user.id,
        data: {
          metadata: discordUser,
        },
      })
    }

    const session = await lucia.createSession(user.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    let redirectTo = cookies().get('redirectTo')?.value ?? null

    if (!redirectTo) {
      if (user?.slug) {
        redirectTo = `/profile/${user?.slug}`
      } else {
        redirectTo = '/create-profile'
      }
    }

    cookies().delete('redirectTo')

    return new Response(null, {
      status: 302,
      headers: {
        Location: decodeURIComponent(redirectTo),
      },
    })
  } catch (error) {
    console.error(error)
    if (error instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}
