import { Discord, generateState } from 'arctic'
import { cookies } from 'next/headers'

export const discordProvider = new Discord(
  process.env.DISCORD_CLIENT_ID!,
  process.env.DISCORD_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_APP_URL}/api/v1/auth/callback`,
)

export const createDiscordAuthorizationUrl = async () => {
  const state = generateState()
  const url = await discordProvider.createAuthorizationURL(state, {
    scopes: ['identify', 'guilds', 'guilds.members.read'],
  })

  cookies().set('oauth-state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  })

  return url.toString()
}

export const getDiscordUser = async (code: string) => {
  try {
    const tokens = await discordProvider.validateAuthorizationCode(code)

    const discordUser = await fetch(`https://discord.com/api/users/@me`, {
      headers: {
        authorization: `Bearer ${tokens.accessToken}`,
      },
    }).then((res) => res.json())

    return discordUser?.id ? discordUser : null
  } catch (error) {
    throw new Error('Failed to get Discord user')
  }
}
