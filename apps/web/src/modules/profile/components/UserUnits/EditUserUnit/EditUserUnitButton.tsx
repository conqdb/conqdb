'use client'
import React from 'react'
import { useEditUserUnitFormContext, useEditUserUnitStore } from './EditUserUnitProvider'
import { ActionIcon, rem } from '@mantine/core'
import { Icon } from '@/modules/common/components/Icon'
import { IconEdit } from '@tabler/icons-react'
import { ExpandedUserUnit } from '@/modules/profile/utils/defaultUserUnitSort'

interface EditButtonProps {
  userUnit: ExpandedUserUnit
}

export const EditUserUnitButton = ({ userUnit }: EditButtonProps) => {
  const toggle = useEditUserUnitStore((state) => state.toggleModal)
  const form = useEditUserUnitFormContext()
  const setTitle = useEditUserUnitStore((state) => state.setCurrentTitle)

  const handleEditUnit = () => {
    setTitle(userUnit?.unit?.name || '')
    form.setInitialValues({
      userUnit: userUnit.id,
      status: userUnit.status,
      favourite: Boolean(userUnit?.favourite),
      hasLeadershipDoc: Boolean(userUnit?.hasLeadershipDoc),
      masteryNodes: userUnit?.masteryNodes,
    })
    form.reset()
    toggle()
  }

  return (
    <ActionIcon onClick={handleEditUnit} variant="default" size="sm">
      <Icon icon={IconEdit} size={rem(16)} />
    </ActionIcon>
  )
}
