import { TabsTab } from '@mantine/core'
import React from 'react'

export const UserUnitsTab = ({
  value,
  length,
  children,
}: {
  value: string
  length: number
  children: React.ReactNode
}) => {
  return (
    <TabsTab value={value}>
      {children} ({length})
    </TabsTab>
  )
}
