'use client'
import React from 'react'
import { useAddUserUnitStore } from './addUserUnit.store'
import { Switch } from '@mantine/core'

export const HideOwned = ({ label }: { label: string }) => {
  const hideOwned = useAddUserUnitStore((state) => state.hideOwned)
  const setHideOwned = useAddUserUnitStore((state) => state.setHideOwned)

  const handleSwitchChange = () => {
    setHideOwned(!hideOwned)
  }

  return (
    <Switch
      label={label}
      size="xs"
      labelPosition="left"
      ml="auto"
      style={{ alignSelf: 'center' }}
      checked={hideOwned}
      onChange={handleSwitchChange}
    />
  )
}
