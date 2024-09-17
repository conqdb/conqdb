'use client'
import { Link } from '@/navigation'
import { Anchor as MantineAnchor, AnchorProps as MantineAnchorProps } from '@mantine/core'
import React from 'react'

interface AnchorProps extends MantineAnchorProps {
  href: string
  children?: React.ReactNode
}

export const Anchor: React.FC<AnchorProps> = ({ children, href, ...props }) => {
  return (
    <MantineAnchor component={Link} href={href} {...props}>
      {children}
    </MantineAnchor>
  )
}
