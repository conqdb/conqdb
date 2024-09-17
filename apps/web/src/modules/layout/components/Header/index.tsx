import { AppShellHeader, Badge, Group } from '@mantine/core'
import React from 'react'
import { HeaderLogo } from './HeaderLogo'
import { BurgerMenu } from './BurgerMenu'
import { DesktopMenu } from './DesktopMenu'
import { Controls } from './Controls'
import { MobileMenu } from './MobileMenu'

interface HeaderProps {
  children?: React.ReactNode
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <AppShellHeader px="md" zIndex={150}>
      <Group align="center" justify="space-between" h="100%">
        <Group>
          <BurgerMenu />
          <HeaderLogo />
          <Badge color="red" variant="light">
            Beta
          </Badge>
          <DesktopMenu />
          <MobileMenu />
        </Group>
        <Controls />
      </Group>
    </AppShellHeader>
  )
}
