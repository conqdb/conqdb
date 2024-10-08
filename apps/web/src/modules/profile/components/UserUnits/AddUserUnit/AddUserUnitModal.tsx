'use client'
import React from 'react'
import { Modal, Text } from '@mantine/core'
import { useAddUserUnitStore } from './addUserUnit.store'

export const AddUserUnitModal = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => {
  const modalOpened = useAddUserUnitStore((state) => state.addUnitOpened)
  const closeModal = useAddUserUnitStore((state) => state.closeAddUnit)
  const currentUnit = useAddUserUnitStore((state) => state.currentUnit)

  return (
    <Modal
      opened={modalOpened}
      onClose={closeModal}
      title={
        <Text fw={500}>
          {label}: {currentUnit?.name}
        </Text>
      }
    >
      {children}
    </Modal>
  )
}
