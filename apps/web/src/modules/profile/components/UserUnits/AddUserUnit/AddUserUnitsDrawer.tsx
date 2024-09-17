'use client'
import { Drawer, ScrollAreaAutosize, Text } from '@mantine/core'
import React from 'react'
import { useAddUserUnitStore } from './addUserUnit.store'

export const AddUserUnitsDrawer = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const opened = useAddUserUnitStore((state) => state.addUnitsOpened)
  const close = useAddUserUnitStore((state) => state.closeAddUnits)

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title={<Text fw={500}>{title}</Text>}
      position="right"
      scrollAreaComponent={ScrollAreaAutosize}
      keepMounted={false}
      size="lg"
    >
      {children}
    </Drawer>
  )
}
