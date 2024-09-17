'use client'
import { createFormContext } from '@mantine/form'
import React, { createContext } from 'react'
import { EditProfileSchema, editProfileSchema } from './editProfile.schema'
import { useDisclosure } from '@mantine/hooks'
import { User } from '@/payload-types'
import { formatInitialProfileValues } from '../../utils/formatInitialProfileValues'
import { updateProfile } from '../../actions'
import { useTranslations } from 'next-intl'
import { zodToFormErrors } from '@/utils/zodToFormErrors'
import { showSuccessNotification } from '@/modules/common/utils/showSuccessNotification'
import { showErrorNotification } from '@/modules/common/utils/showErrorNotification'
import { modals } from '@mantine/modals'

type EditProfileContextType = {
  opened: boolean
  open: () => void
  close: () => void
  toggle: () => void
  isPending: boolean
  setIsPending: (value: boolean) => void
  handleSubmit: (values: EditProfileSchema) => void
}

export const EditProfileContext = createContext<EditProfileContextType>({
  opened: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
  isPending: false,
  setIsPending: () => {},
  handleSubmit: () => {},
})

export const [EditProfileFormProvider, useEditProfileFormContext, useEditProfileForm] =
  createFormContext<EditProfileSchema>()

interface EditProfileFormProps {
  children?: React.ReactNode
  user: User
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ children, user }) => {
  const [opened, { open, close, toggle }] = useDisclosure()
  const [isPending, setIsPending] = React.useState(false)
  const tv = useTranslations('validation')
  const tc = useTranslations('common')

  const form = useEditProfileForm({
    initialValues: formatInitialProfileValues(user) as any,
    validate: (values) => {
      const dirtyValues = getDirtyValues(values)
      const parsed = editProfileSchema(tv).safeParse(dirtyValues)
      return parsed.error ? zodToFormErrors(parsed.error) : {}
    },
  })

  const getDirtyValues = (values: EditProfileSchema) => {
    const dirtyValues: Partial<
      Record<keyof EditProfileSchema, EditProfileSchema[keyof EditProfileSchema]>
    > = {}
    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof EditProfileSchema
      if (form.isDirty(key)) {
        dirtyValues[typedKey] = values[typedKey]
      }
    })
    return dirtyValues
  }

  const handleSubmit = async (values: EditProfileSchema) => {
    setIsPending(true)

    const dirtyValues = getDirtyValues(values)

    if (Object.keys(dirtyValues).length > 0) {
      const result = await updateProfile(dirtyValues)

      if (result.success) {
        showSuccessNotification({ title: result?.title, message: result?.message })
        form.setInitialValues(formatInitialProfileValues(result?.data) as any)
        form.reset()
        setIsPending(false)
        close()
      } else if (result?.errors) {
        setIsPending(false)
        form.setErrors(result.errors)
        showErrorNotification({ title: result?.title, message: result?.message })
      }
    }

    setIsPending(false)
  }

  const handleClose = () => {
    if (isPending) {
      return
    } else if (form.isDirty()) {
      modals.openConfirmModal({
        title: tc('warning.label'),
        children: tc('warning.unsavedChanges'),
        labels: { confirm: tc('actions.confirm'), cancel: tc('actions.cancel') },
        onConfirm: () => {
          form.reset()
          close()
        },
      })
    } else {
      close()
    }
  }

  const handleToggle = () => {
    if (isPending) {
      return
    } else {
      toggle()
    }
  }

  return (
    <EditProfileContext.Provider
      value={{
        opened,
        open,
        close: handleClose,
        toggle: handleToggle,
        isPending,
        setIsPending,
        handleSubmit,
      }}
    >
      <EditProfileFormProvider form={form}>{children}</EditProfileFormProvider>
    </EditProfileContext.Provider>
  )
}

export default EditProfileForm
