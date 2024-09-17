'use client'
import React from 'react'
import { iconMap } from '@/modules/layout/components/Header/iconMap'
import { Icon } from '@/modules/common/components/Icon'

export const ChildIcon = ({ icon }: { icon: keyof typeof iconMap }) => {
  return <Icon icon={iconMap[icon]} size={22} />
}
