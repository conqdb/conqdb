'use client'
import React from 'react'
import classes from './index.module.css'
import { UnstyledButton } from '@mantine/core'
import { Link } from '@/navigation'

export const LinkWithoutChildren = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  return (
    <UnstyledButton component={Link} href={href} className={classes.link}>
      {children}
    </UnstyledButton>
  )
}
