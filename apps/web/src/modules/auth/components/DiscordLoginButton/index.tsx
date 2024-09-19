'use client'

import { DiscordButton, DiscordButtonProps } from '@/modules/common/components/DiscordButton'
import React from 'react'
import { login } from '../../actions'
import { useSearchParams } from 'next/navigation'

interface DiscordLoginButtonProps extends DiscordButtonProps {
  redirectTo?: string
}

export const DiscordLoginButton: React.FC<DiscordLoginButtonProps> = ({ redirectTo, children }) => {
  const searchParams = useSearchParams()

  return (
    <DiscordButton
      onClick={() => login({ redirectTo: redirectTo || searchParams.get('redirect') || undefined })}
    >
      {children}
    </DiscordButton>
  )
}
