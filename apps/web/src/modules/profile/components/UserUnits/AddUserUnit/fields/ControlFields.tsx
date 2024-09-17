'use client'
import { Button, Group } from '@mantine/core'
import React from 'react'
import { useAddUserUnitStore } from '../addUserUnit.store'

export const ControlFields = ({ save, cancel }: { save: string; cancel: string }) => {
  const closeModal = useAddUserUnitStore((state) => state.closeAddUnit)
  const isPending = useAddUserUnitStore((state) => state.isPending)

  const handleClose = () => {
    if (isPending) {
      return
    } else {
      closeModal()
    }
  }

  return (
    <Group justify="flex-end">
      <Button variant="light" type="submit" loading={isPending}>
        {save}
      </Button>
      <Button variant="default" onClick={handleClose}>
        {cancel}
      </Button>
    </Group>
  )
}
