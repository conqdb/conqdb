'use client'
import { Checkbox } from '@mantine/core'
import React from 'react'
import { useEditUserUnitFormContext } from '../EditUserUnitProvider'

export const HasLeadershipField = ({ label }: { label: string }) => {
  const form = useEditUserUnitFormContext()

  return (
    <Checkbox label={label} {...form.getInputProps('hasLeadershipDoc', { type: 'checkbox' })} />
  )
}
