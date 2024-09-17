'use client'

import type { BoxProps } from '@mantine/core'
import { Text, Tooltip, UnstyledButton, createPolymorphicComponent } from '@mantine/core'

import cx from 'clsx'
import classes from './index.module.css'
import React from 'react'

export interface BaseControlProps extends BoxProps {
  tooltip: string
  children: React.ReactNode
  disabled?: boolean
}

const _BaseControl = ({ tooltip, className, disabled = false, ...others }: BaseControlProps) => {
  return (
    <Tooltip
      label={
        <Text size="xs" c="gray.0">
          {tooltip}
        </Text>
      }
      disabled={disabled}
    >
      <UnstyledButton
        className={cx(classes.control, 'mantine-active', className)}
        aria-label={tooltip}
        {...others}
      />
    </Tooltip>
  )
}

export const BaseControl = createPolymorphicComponent<'button', BaseControlProps>(_BaseControl)
