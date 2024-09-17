'use client'
import { Checkbox } from '@mantine/core'
import React from 'react'
import { useAddUserUnitFormContext } from '../AddUserUnitProvider'

export const HasLeadershipField = ({ label }: { label: string }) => {
  const form = useAddUserUnitFormContext()

  return (
    <Checkbox label={label} {...form.getInputProps('hasLeadershipDoc', { type: 'checkbox' })} />
  )
}
