'use client'
import React from 'react'
import classes from './DiscordLoginButton.module.css'
import { DiscordIcon } from './DiscordIcon'
import { useSearchParams } from 'next/navigation'
import { login } from '@/modules/auth/actions'

export const DiscordLoginButton = () => {
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/admin'

  const handleLogin = async () => {
    await login({
      redirectTo: redirect.startsWith('/admin') ? redirect : '/admin',
      nativeRedirect: true,
    })
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
