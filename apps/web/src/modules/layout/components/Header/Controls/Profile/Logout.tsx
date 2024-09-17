'use client'
import { logout } from '@/modules/auth/actions'
import { Icon } from '@/modules/common/components/Icon'
import { MenuItem } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'
import React from 'react'

export const Logout = ({ label }: { label: string }) => {
  return (
    <MenuItem leftSection={<Icon icon={IconLogout} size={16} />} c="red" onClick={() => logout()}>
      {label}
    </MenuItem>
  )
}
