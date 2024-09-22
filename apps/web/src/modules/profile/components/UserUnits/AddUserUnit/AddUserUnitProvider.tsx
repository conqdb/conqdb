'use client'
import React, { useEffect } from 'react'
import { createFormContext, zodResolver } from '@mantine/form'
import { addUserUnitSchema, AddUserUnitSchema } from './addUserUnit.schema'
import { useTranslations } from 'next-intl'
import { useAddUserUnitStore } from './addUserUnit.store'

export const [AddUserUnitFormProvider, useAddUserUnitFormContext, useAddUserUnitForm] =
  createFormContext<AddUserUnitSchema>()

export const defaultAddUserUnitFormValues = ({
  user = '',
  unit = '',
  status = 'training',
  hasLeadershipDoc = false,
  favourite = false,
  masteryNodes = 0,
}: Partial<AddUserUnitSchema> = {}) => {
  return {
    user,
    unit,
    status,
    hasLeadershipDoc,
    favourite,
    masteryNodes,
  }
}

export const AddUserUnitProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode
  userId: string
}) => {
  const t = useTranslations('validation')
  const form = useAddUserUnitForm({
    mode: 'uncontrolled',
    initialValues: defaultAddUserUnitFormValues(),
    validate: zodResolver(addUserUnitSchema(t)),
  })
  const currentUnit = useAddUserUnitStore((state) => state.currentUnit)

  useEffect(() => {
    if (currentUnit) {
      form.setInitialValues(
        defaultAddUserUnitFormValues({
          unit: currentUnit.id,
          user: userId,
        }),
      )
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUnit, userId])

  return <AddUserUnitFormProvider form={form}>{children}</AddUserUnitFormProvider>
}
