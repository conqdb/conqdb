'use client'
import { Burger } from '@mantine/core'
import React from 'react'
import { useLayoutStore } from '../../store'

export const BurgerMenu = () => {
  const navOpened = useLayoutStore.use.navOpened()
  const toggleNav = useLayoutStore.use.toggleNav()

  return <Burger opened={navOpened} onClick={toggleNav} hiddenFrom="sm" size="md" />
}
