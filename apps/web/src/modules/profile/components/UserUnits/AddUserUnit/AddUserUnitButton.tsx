'use client'
import React from 'react'
import { useAddUserUnitStore } from './addUserUnit.store'
import { Button } from '@mantine/core'
import { Icon } from '@/modules/common/components/Icon'
import { IconPlus } from '@tabler/icons-react'

export const AddUserUnitButton = ({ children }: { children: React.ReactNode }) => {
  const open = useAddUserUnitStore((state) => state.openAddUnits)

  return (
    <Button
      variant="default"
      size="compact-sm"
      rightSection={<Icon icon={IconPlus} size="1rem" />}
      onClick={open}
    >
      {children}
    </Button>
  )
}
