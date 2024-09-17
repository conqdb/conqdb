import React from 'react'
import { UnitCardBase } from './UnitCardBase'
import { Unit } from '@/payload-types'
import { Box, BoxProps } from '@mantine/core'
import classes from './index.module.css'
import { IconPlus } from '@tabler/icons-react'
import clsx from 'clsx'

interface AddUnitCardProps extends BoxProps {
  unit: Unit
  onClick: () => void
}

export const AddUnitCard: React.FC<AddUnitCardProps> = ({ unit, onClick, className, ...props }) => {
  return (
    <Box
      onClick={onClick}
      className={clsx(classes.addUnitCardWrapper, 'mantine-active', className)}
      {...props}
    >
      <UnitCardBase unit={unit}>
        <Box className={classes.addUnitCardOverlay}>
          <IconPlus />
        </Box>
      </UnitCardBase>
    </Box>
  )
}
