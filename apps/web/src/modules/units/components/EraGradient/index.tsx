import { Unit } from '@/payload-types'
import { Box, BoxProps } from '@mantine/core'
import clsx from 'clsx'
import React from 'react'
import classes from '@/styles/gradients.module.css'

interface EraGradient extends BoxProps {
  era: Unit['era']
  children?: React.ReactNode
}

export const EraGradient: React.FC<EraGradient> = ({ era, children, className, ...props }) => {
  const resolvedEra =
    typeof era === 'object' &&
    era.slug &&
    (era.slug === 'rustic' ||
      era.slug === 'feudal' ||
      era.slug === 'chivalric' ||
      era.slug === 'silver' ||
      era.slug === 'heroic' ||
      era.slug === 'golden')
      ? era.slug
      : 'rustic'

  return (
    <Box className={clsx(classes.root, className)}>
      <Box
        {...props}
        className={clsx(classes.bg, {
          [classes.gray]: resolvedEra === 'feudal' || resolvedEra === 'rustic',
          [classes.green]: resolvedEra === 'chivalric',
          [classes.blue]: resolvedEra === 'silver',
          [classes.purple]: resolvedEra === 'heroic',
          [classes.gold]: resolvedEra === 'golden',
        })}
      >
        {children}
      </Box>
    </Box>
  )
}
