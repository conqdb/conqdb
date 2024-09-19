'use client'

import { DiscordButton, DiscordButtonProps } from '@/modules/common/components/DiscordButton'
import React from 'react'
import { login } from '../../actions'
import { useSearchParams } from 'next/navigation'
import { useRouter } from '@/navigation'

interface DiscordLoginButtonProps extends DiscordButtonProps {
  redirectTo?: string
}

export const DiscordLoginButton: React.FC<DiscordLoginButtonProps> = ({ redirectTo, children }) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const handleLogin = async () => {
    const { url } = await login({
      redirectTo: redirectTo || searchParams.get('redirect') || undefined,
    })

    if (!url) {
      return
    }

    return router.push(url)
  }
  return <DiscordButton onClick={handleLogin}>{children}</DiscordButton>
}
