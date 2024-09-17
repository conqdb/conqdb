'use client'
import {
  Box,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerRoot,
} from '@mantine/core'
import React from 'react'
import classes from './index.module.css'
import { useLayoutStore } from '@/modules/layout/store'
import { BrandLogo } from '@/modules/common/components/BrandLogo'

export const Drawer = ({ children }: { children?: React.ReactNode }) => {
  const navOpened = useLayoutStore.use.navOpened()
  const closeNav = useLayoutStore.use.closeNav()

  return (
    <DrawerRoot opened={navOpened} onClose={closeNav}>
      <DrawerOverlay />
      <DrawerContent>
        <Box className={classes.container}>
          <DrawerHeader className={classes.header}>
            <BrandLogo h="2rem" />
            <DrawerCloseButton />
          </DrawerHeader>
          {children}
        </Box>
      </DrawerContent>
    </DrawerRoot>
  )
}
