'use client'
import { ActionIcon, Button, Group } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React, { useCallback } from 'react'
import { useEditUserUnitFormContext, useEditUserUnitStore } from '../EditUserUnitProvider'
import { modals } from '@mantine/modals'
import { IconTrash } from '@tabler/icons-react'
import { deleteUserUnitAction } from '@/modules/profile/actions'
import { showSuccessNotification } from '@/modules/common/utils/showSuccessNotification'
import { showErrorNotification } from '@/modules/common/utils/showErrorNotification'

export const ControlFields = ({ save, cancel }: { save: string; cancel: string }) => {
  const closeModal = useEditUserUnitStore((state) => state.closeModal)
  const form = useEditUserUnitFormContext()
  const isPending = useEditUserUnitStore((state) => state.isPending)
  const setIsPending = useEditUserUnitStore((state) => state.setIsPending)
  const t = useTranslations()

  const handleClose = () => {
    if (isPending) {
      return
    } else if (form.isDirty()) {
      modals.openConfirmModal({
        title: t('common.warning.label'),
        children: t('common.warning.unsavedChanges'),
        labels: {
          confirm: t('common.actions.confirm'),
          cancel: t('common.actions.cancel'),
        },
        onConfirm: () => {
          closeModal()
        },
      })
    } else {
      closeModal()
    }
  }

  const handleDelete = () => {
    modals.openConfirmModal({
      title: t('common.warning.label'),
      children: t('common.warning.delete'),
      labels: {
        confirm: t('common.actions.delete'),
        cancel: t('common.actions.cancel'),
      },
      onConfirm: () => {
        deleteUserUnit()
      },
    })
  }

  const deleteUserUnit = useCallback(async () => {
    try {
      setIsPending(true)
      const result = await deleteUserUnitAction(form.values.userUnit)

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
    } catch (error) {
      console.error(error)
    }
    setIsPending(false)
  }, [closeModal, form, setIsPending])

  return (
    <Group justify="flex-end" gap="xs">
      <Button variant="light" type="submit" disabled={!form.isDirty()}>
        {save}
      </Button>
      <Button variant="default" onClick={handleClose}>
        {cancel}
      </Button>
      <ActionIcon variant="light" color="red" size={36} onClick={handleDelete}>
        <IconTrash strokeWidth={1.5} size={18} />
      </ActionIcon>
    </Group>
  )
}
