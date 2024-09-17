'use client'

import React from 'react'
import { DrawerBody as MantineDrawerBody, ScrollArea } from '@mantine/core'
import classes from './index.module.css'

export const DrawerBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineDrawerBody component={ScrollArea} className={classes.main} p={0}>
      {children}
    </MantineDrawerBody>
  )
}
