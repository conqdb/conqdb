'use client'
import { Link } from '@/navigation'
import { UnstyledButton, UnstyledButtonProps } from '@mantine/core'
import React from 'react'

interface UnstyledButtonLinkProps extends UnstyledButtonProps {
  children?: React.ReactNode
  href: string
}

export const UnstyledButtonLink: React.FC<UnstyledButtonLinkProps> = ({
  children,
  href,
  ...props
}) => {
  return (
    <UnstyledButton component={Link} href={href} {...props}>
      {children}
    </UnstyledButton>
  )
}
