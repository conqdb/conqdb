import React from 'react'
import { AppShellMain } from '@mantine/core'

export const PageTemplate = ({ children }: { children: React.ReactNode }) => {
  return <AppShellMain>{children}</AppShellMain>
}
