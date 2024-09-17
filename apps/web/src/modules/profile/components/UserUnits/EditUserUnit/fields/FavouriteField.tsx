'use client'
import React from 'react'

import { Switch } from '@mantine/core'
import { useEditUserUnitFormContext } from '../EditUserUnitProvider'

export const FavouriteField = ({ label }: { label: string }) => {
  const form = useEditUserUnitFormContext()
  return <Switch label={label} {...form.getInputProps('favourite', { type: 'checkbox' })} />
}
