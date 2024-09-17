import { AppShellFooter, AppShellNavbar } from '@mantine/core'
import React from 'react'

export const DashboardNavbar = async () => {
  return (
    <>
      <AppShellNavbar visibleFrom="xs">test</AppShellNavbar>
      <AppShellFooter hiddenFrom="xs">Test</AppShellFooter>
    </>
  )
}
