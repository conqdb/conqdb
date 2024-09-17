'use client'
import React from 'react'
import { useAddUserUnitFormContext } from '../AddUserUnitProvider'
import { Switch } from '@mantine/core'

export const FavouriteField = ({ label }: { label: string }) => {
  const form = useAddUserUnitFormContext()
  return <Switch label={label} {...(form.getInputProps('favourite'), { type: 'checkbox' })} />
}
