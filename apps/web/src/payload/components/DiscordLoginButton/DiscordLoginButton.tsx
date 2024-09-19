'use client'
import React from 'react'
import classes from './DiscordLoginButton.module.css'
import { DiscordIcon } from './DiscordIcon'
import { useSearchParams } from 'next/navigation'
import { login } from '@/modules/auth/actions'
import { useRouter } from 'next/navigation'

export const DiscordLoginButton = () => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'
  const router = useRouter()

  const handleLogin = async () => {
    const { url } = await login({
      redirectTo: redirect.startsWith('/admin') ? redirect : '/admin',
    })

    if (!url) {
      return
    }

    return router.push(url)
  }

  return (
    <div className={classes.container}>
      <button className={classes.discord} onClick={handleLogin}>
        <DiscordIcon size={20} className={classes.discordIcon} />
        <div className={classes.discordText}>Sign in with Discord</div>
      </button>
    </div>
  )
}
