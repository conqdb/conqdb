'use client'
import React from 'react'
import { MantineProvider } from '@mantine/core'
import { theme } from '@/styles/theme'
import { cssVariablesResolver } from '@/styles/cssVariablesResolver'

interface ThemeProviderProps {
  children?: React.ReactNode
  font: {
    style: {
      fontFamily: string
    }
  }
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, font }) => {
  return (
    <MantineProvider
      theme={{ ...theme, fontFamily: font.style.fontFamily }}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme="auto"
    >
      {children}
    </MantineProvider>
  )
}
