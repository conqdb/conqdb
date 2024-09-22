'use client'

import { createContext, useContext, useRef } from 'react'
import { EditUserUnitStore, createEditUserUnitStore } from './editUserUnit.store'
import { useStore } from 'zustand'
import { createFormContext } from '@mantine/form'
import { editUserUnitSchema, EditUserUnitSchema } from './editUserUnit.schema'
import { useTranslations } from 'next-intl'
import { zodToFormErrors } from '@/utils/zodToFormErrors'

export type EditUserUnitStoreApi = ReturnType<typeof createEditUserUnitStore>

export const EditUserUnitStoreContext = createContext<EditUserUnitStoreApi | undefined>(undefined)

export interface EditUserUnitProviderProps {
  children: React.ReactNode
}

export const [EditUserUnitFormProvider, useEditUserUnitFormContext, useEditUserUnitForm] =
  createFormContext<EditUserUnitSchema>()

export const EditUserUnitProvider = ({ children }: EditUserUnitProviderProps) => {
  const storeRef = useRef<EditUserUnitStoreApi>(undefined)
  const tv = useTranslations('validation')
  if (!storeRef.current) {
    storeRef.current = createEditUserUnitStore()
  }

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

  const form = useEditUserUnitForm({
    mode: 'controlled',
    initialValues: {
      userUnit: '',
      status: 'training',
      favourite: false,
      hasLeadershipDoc: false,
      masteryNodes: 0,
    },
    validate: (values) => {
      const dirtyValues = getDirtyValues(values)

      const parsed = editUserUnitSchema(tv).safeParse({ userUnit: values.userUnit, ...dirtyValues })
      return parsed.error ? zodToFormErrors(parsed.error) : {}
    },
  })

  return (
    <EditUserUnitStoreContext.Provider value={storeRef.current}>
      <EditUserUnitFormProvider form={form}>{children}</EditUserUnitFormProvider>
    </EditUserUnitStoreContext.Provider>
  )
}

export const useEditUserUnitStore = <T,>(selector: (store: EditUserUnitStore) => T): T => {
  const editUserUnitStoreContext = useContext(EditUserUnitStoreContext)

  if (!editUserUnitStoreContext) {
    throw new Error(`useEditUserUnitStore must be used within EditUserUnitProvider`)
  }

  return useStore(editUserUnitStoreContext, selector)
}
