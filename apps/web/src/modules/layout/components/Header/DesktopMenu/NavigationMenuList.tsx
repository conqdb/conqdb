'use client'
import React from 'react'
import { List } from '@radix-ui/react-navigation-menu'
import { Group } from '@mantine/core'
import classes from './index.module.css'

export const NavigationMenuList = ({ children }: { children: React.ReactNode }) => {
  return (
    <List asChild>
      <Group className={classes.list} component="ul" visibleFrom="md">
        {children}
      </Group>
    </List>
  )
}
