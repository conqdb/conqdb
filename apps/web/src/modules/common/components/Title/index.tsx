import React from 'react'
import { Title as MantineTitle, TitleProps as MantineTitleProps } from '@mantine/core'

interface TitleProps extends MantineTitleProps {
  children?: React.ReactNode
}

export const Title: React.FC<TitleProps> = ({
  order = 1,
  fz = {
    base: {
      1: 28,
      2: 24,
      3: 22,
      4: 20,
      5: 16,
      6: 16,
    }[order],
    xs: {
      1: 34,
      2: 28,
      3: 22,
      4: 20,
      5: 18,
      6: 18,
    }[order],
    xl: {
      1: 36,
      2: 30,
      3: 24,
      4: 20,
      5: 18,
      6: 18,
    }[order],
  },
  children,
  ...props
}) => {
  return (
    <MantineTitle order={1} fz={fz} {...props}>
      {children}
    </MantineTitle>
  )
}
