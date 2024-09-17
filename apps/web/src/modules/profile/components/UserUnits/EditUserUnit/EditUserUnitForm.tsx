'use client'

import React from 'react'
import { useEditUserUnitFormContext, useEditUserUnitStore } from './EditUserUnitProvider'
import { EditUserUnitSchema } from './editUserUnit.schema'
import { editUserUnitAction } from '@/modules/profile/actions'
import { showSuccessNotification } from '@/modules/common/utils/showSuccessNotification'
import { showErrorNotification } from '@/modules/common/utils/showErrorNotification'
import { LoadingOverlay } from '@mantine/core'

export const EditUserUnitForm = ({ children }: { children: React.ReactNode }) => {
  const form = useEditUserUnitFormContext()
  const setIsPending = useEditUserUnitStore((state) => state.setIsPending)
  const closeModal = useEditUserUnitStore((state) => state.closeModal)
  const isPending = useEditUserUnitStore((state) => state.isPending)

  const getDirtyValues = (values: EditUserUnitSchema) => {
    const dirtyValues: Partial<
      Record<keyof EditUserUnitSchema, EditUserUnitSchema[keyof EditUserUnitSchema]>
    > = {}
    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof EditUserUnitSchema
      if (form.isDirty(key)) {
        dirtyValues[typedKey] = values[typedKey]
      }
    })
    return dirtyValues
  }

  const handleSubmit = async (values: EditUserUnitSchema) => {
    try {
      setIsPending(true)

      const dirtyValues = getDirtyValues(values) as EditUserUnitSchema

      if (Object.keys(dirtyValues).length > 0) {
        const result = await editUserUnitAction({ ...dirtyValues, userUnit: values.userUnit })

        if (result.success) {
          showSuccessNotification({ title: result?.title, message: result?.message })
          setIsPending(false)
          closeModal()
        } else if (result?.errors) {
          setIsPending(false)
          form.setErrors(result?.errors)
          showErrorNotification({ title: result?.title, message: result?.message })
        } else {
          setIsPending(false)
          showErrorNotification({ title: result?.title, message: result?.message })
        }
      }

      setIsPending(false)
    } catch (error) {
      setIsPending(false)
    }
  }
  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      {children}
      <LoadingOverlay visible={isPending} zIndex={1000} />
    </form>
  )
}
