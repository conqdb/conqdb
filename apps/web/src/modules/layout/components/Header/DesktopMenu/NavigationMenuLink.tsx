'use client'
import React from 'react'
import { Link as RadixLink } from '@radix-ui/react-navigation-menu'
import { UnstyledButton } from '@mantine/core'
import { Link } from '@/navigation'
import clsx from 'clsx'
import classes from './index.module.css'

export const NavigationMenuLink = ({
  children,
  url,
}: {
  children: React.ReactNode
  url: string
}) => {
  return (
    <RadixLink asChild>
      <UnstyledButton
        component={Link}
        href={url}
        className={clsx(classes.link, 'mantine-focus-auto')}
      >
        {children}
      </UnstyledButton>
    </RadixLink>
  )
}
