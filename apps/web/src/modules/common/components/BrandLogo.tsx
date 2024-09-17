'use client'

import React, { forwardRef } from 'react'
import { Box, BoxProps, createPolymorphicComponent } from '@mantine/core'
import LightModeLogo from 'public/conqdb-logo-landscape-lightmode.svg'
import DarkModeLogo from 'public/conqdb-logo-landscape-darkmode.svg'

interface BrandLogoProps extends BoxProps {}

/* eslint-disable react/display-name */
export const BrandLogo = createPolymorphicComponent<'div', BrandLogoProps>(
  forwardRef<HTMLDivElement, BrandLogoProps>(({ ...rest }, ref) => (
    <Box {...rest} ref={ref}>
      <Box darkHidden>
        <Box component={LightModeLogo} h={rest.h || '2.5rem'} display="block" />
      </Box>
      <Box lightHidden>
        <Box component={DarkModeLogo} h={rest.h || '2.5rem'} display="block" />
      </Box>
    </Box>
  )),
)
