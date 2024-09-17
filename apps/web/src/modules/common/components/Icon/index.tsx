'use client'
import React from 'react'
import { Box, BoxProps } from '@mantine/core'
import classes from './index.module.css'
import clsx from 'clsx'

export interface IconProps extends BoxProps {
  icon: any
  size?: string | number
  strokeWidth?: number
}

export const Icon = ({
  icon,
  size = '1.5rem',
  strokeWidth = 1.7,
  className,
  ...rest
}: IconProps) => {
  return (
    <Box {...rest}>
      <Box
        component={icon}
        strokeWidth={strokeWidth}
        w={size}
        h={size}
        className={clsx(classes.icon, className)}
      />
    </Box>
  )
}
