'use client'

import React from 'react'
import { BaseControl } from './BaseControl'
import { Box, BoxProps, rem, useComputedColorScheme, useMantineColorScheme } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react'

interface ThemeSwitcherProps extends BoxProps {
  label: string
  tooltip?: boolean
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ label, tooltip = true, ...rest }) => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  return (
    <BaseControl
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      tooltip={label}
      disabled={!tooltip}
      {...rest}
    >
      <Box component={IconSun} darkHidden stroke={1.5} w={rem(22)} h={rem(22)} />
      <Box component={IconMoon} lightHidden stroke={1.5} w={rem(22)} h={rem(22)} />
    </BaseControl>
  )
}
