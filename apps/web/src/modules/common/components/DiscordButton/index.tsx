'use client'
import { Button, ButtonProps, createPolymorphicComponent, MantineSize } from '@mantine/core'
import React, { forwardRef } from 'react'
import cx from 'clsx'

import classes from './index.module.css'
import { DiscordIcon } from '../../icons/DiscordIcon'

export interface DiscordButtonProps extends ButtonProps {
  children?: React.ReactNode
}

/* eslint-disable react/display-name */
export const DiscordButton = createPolymorphicComponent<'button', DiscordButtonProps>(
  forwardRef<HTMLButtonElement, DiscordButtonProps>(
    ({ children, className, size = 'sm', ...rest }, ref) => (
      <Button
        size={size}
        fw={500}
        leftSection={
          <DiscordIcon
            size={
              {
                xs: '0.9rem',
                'compact-xs': '0.9rem',
                sm: '1rem',
                'compact-sm': '1rem',
                md: '1.1rem',
                'compact-md': '1.1rem',
                lg: '1.2rem',
                'compact-lg': '1.2rem',
                xl: '1.3rem',
                'compact-xl': '1.3rem',
              }[size as MantineSize] || 'sm'
            }
          />
        }
        className={cx(classes.root, className)}
        {...rest}
        ref={ref}
      >
        {children}
      </Button>
    ),
  ),
)

DiscordButton.displayName = 'DiscordButton'
