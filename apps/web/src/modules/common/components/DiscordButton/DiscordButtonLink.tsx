'use client'

import React from 'react'
import { DiscordButton, DiscordButtonProps } from './index'
import { Link } from '@/navigation'

interface Props extends DiscordButtonProps {
  href: string
}

export const DiscordButtonLink: React.FC<Props> = ({ href, children, ...props }) => {
  return (
    <DiscordButton component={Link} href={href} {...props}>
      {children}
    </DiscordButton>
  )
}
