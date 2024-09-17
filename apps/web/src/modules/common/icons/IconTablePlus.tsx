'use client'
import React from 'react'
import { Icon, IconProps } from '../components/Icon'
import { IconTablePlus as IconComponent } from '@tabler/icons-react'

interface Props extends Omit<IconProps, 'icon'> {}

export const IconTablePlus: React.FC<Props> = (props) => {
  return <Icon icon={IconComponent} {...props} />
}
