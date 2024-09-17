'use client'
import { Box } from '@mantine/core'
import React from 'react'
import { AddUserUnitSchema } from './addUserUnit.schema'
import { showSuccessNotification } from '@/modules/common/utils/showSuccessNotification'
import { showErrorNotification } from '@/modules/common/utils/showErrorNotification'
import { addUserUnitAction } from '@/modules/profile/actions'
import { useAddUserUnitStore } from './addUserUnit.store'
import { useAddUserUnitFormContext } from './AddUserUnitProvider'

export const AddUserUnitForm = ({ children }: { children: React.ReactNode }) => {
  const form = useAddUserUnitFormContext()

  const setIsPending = useAddUserUnitStore((state) => state.setIsPending)
  const closeModal = useAddUserUnitStore((state) => state.closeAddUnit)

  const handleSubmit = async (values: AddUserUnitSchema) => {
    try {
      setIsPending(true)
      const result = await addUserUnitAction(values)

      if (result.success) {
        showSuccessNotification({ title: result?.title, message: result?.message })
        setIsPending(false)
        closeModal()
      } else if (result?.errors) {
        setIsPending(false)
        form.setErrors(result?.errors)
        showErrorNotification({ title: result?.title, message: result?.message })
      }
    } catch (error) {
      setIsPending(false)
    }
  }
  return (
    <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      {children}
    </Box>
  )
}
