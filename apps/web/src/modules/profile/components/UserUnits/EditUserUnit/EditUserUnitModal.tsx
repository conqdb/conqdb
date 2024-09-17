'use client'
import { Modal, Text } from '@mantine/core'
import React from 'react'
import { useEditUserUnitFormContext, useEditUserUnitStore } from './EditUserUnitProvider'
import { modals } from '@mantine/modals'
import { useTranslations } from 'next-intl'

interface EditUserUnitModalProps {
  children?: React.ReactNode
}

export const EditUserUnitModal: React.FC<EditUserUnitModalProps> = ({ children }) => {
  const opened = useEditUserUnitStore((state) => state.modalOpened)
  const close = useEditUserUnitStore((state) => state.closeModal)
  const isPending = useEditUserUnitStore((state) => state.isPending)
  const form = useEditUserUnitFormContext()
  const t = useTranslations()
  const title = useEditUserUnitStore((state) => state.currentTitle)

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
          close()
        },
      })
    } else {
      close()
    }
  }

  return (
    <Modal opened={opened} onClose={handleClose} title={<Text fw={500}>{title}</Text>}>
      {children}
    </Modal>
  )
}
