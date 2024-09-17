import { Unit } from '@/payload-types'
import { AspectRatio, Box, BoxProps, Card, Text } from '@mantine/core'
import React from 'react'
import { EraGradient } from '../EraGradient'
import Image from 'next/image'
import { IconPhotoQuestion } from '@tabler/icons-react'
import classes from './index.module.css'

interface UnitCardBaseProps extends BoxProps {
  unit: Unit
  children?: React.ReactNode
}

export const UnitCardBase: React.FC<UnitCardBaseProps> = ({ unit, children, ...props }) => {
  const category = typeof unit?.category === 'object' ? unit?.category?.name : null
  const type = typeof unit?.type === 'object' ? unit?.type?.name : null

  return (
    <Box {...props}>
      <Card p={0}>
        <AspectRatio ratio={3 / 4} w={'100%'} className={classes.aspectRatio}>
          <EraGradient era={unit.era} />
          {unit.image && typeof unit.image === 'object' && typeof unit.image.url === 'string' ? (
            <Image
              src={unit.image.url}
              alt={unit?.name}
              fill={true}
              draggable={false}
              className={classes.image}
              placeholder={unit?.image?.blurHash ? 'blur' : undefined}
              blurDataURL={unit?.image?.blurHash ? unit?.image?.blurHash : undefined}
              style={{
                objectPosition: 'center',
                objectFit: 'contain',
                transform: `translateX(${unit.imageSettings.x}%) translateY(${unit.imageSettings.y}%) scale(${unit.imageSettings.scale})`,
              }}
            />
          ) : (
            <IconPhotoQuestion className={classes.missing} strokeWidth={1.5} />
          )}
          <Box className={classes.children}>{children}</Box>
        </AspectRatio>
        <Box p="xs">
          <Text ta="center" fw={600} size="xs" tt="uppercase" lineClamp={1}>
            {unit.name}
          </Text>
          <Text ta="center" fw={700} fz={8} tt="uppercase" c="dimmed" lineClamp={1} lh={1}>
            {type} - {category}
          </Text>
        </Box>
      </Card>
    </Box>
  )
}
