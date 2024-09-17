'use client'
import React from 'react'
import { Icon, IconProps } from '../components/Icon'
import { IconUser as IconComponent } from '@tabler/icons-react'

interface Props extends Omit<IconProps, 'icon'> {}

export const IconUser: React.FC<Props> = (props) => {
  return <Icon icon={IconComponent} {...props} />
}
