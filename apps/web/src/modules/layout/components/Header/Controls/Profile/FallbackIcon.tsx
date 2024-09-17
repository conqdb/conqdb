'use client'
import { Icon } from '@/modules/common/components/Icon'
import { IconUserCircle } from '@tabler/icons-react'
import React from 'react'

export const FallbackIcon = () => {
  return (
    <>
      <Icon icon={IconUserCircle} size={28} c="gray" lightHidden />
      <Icon icon={IconUserCircle} size={28} c="dark" darkHidden />
    </>
  )
}
