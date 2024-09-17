import { Unit } from '@/payload-types'
import React from 'react'
import { UnitCardBase } from './UnitCardBase'
import { BoxProps, Group, Rating, Stack, Text } from '@mantine/core'
import LeadershipIcon from '@/modules/units/assets/leadership-icon.svg'
import classes from './index.module.css'
import clsx from 'clsx'

interface UnitCardDisplayProps extends BoxProps {
  unit: Unit
}

export const UnitCardDisplay: React.FC<UnitCardDisplayProps> = ({ unit, ...props }) => {
  const resolvedEra =
    typeof unit?.era === 'object' &&
    unit?.era.slug &&
    (unit?.era.slug === 'rustic' ||
      unit?.era.slug === 'feudal' ||
      unit?.era.slug === 'chivalric' ||
      unit?.era.slug === 'silver' ||
      unit?.era.slug === 'heroic' ||
      unit?.era.slug === 'golden')
      ? unit?.era.slug
      : 'rustic'

  return (
    <UnitCardBase unit={unit} {...props}>
      <Group justify="space-between" align="flex-start">
        <Rating
          fractions={2}
          defaultValue={Number(unit.stars)}
          count={5}
          readOnly
          size="sm"
          emptySymbol={<svg />}
          color={
            {
              rustic: 'gray.0',
              feudal: 'gray.0',
              chivalric: 'green.2',
              silver: 'blue.2',
              heroic: 'purple.2',
              golden: 'amber.2',
            }[resolvedEra]
          }
          classNames={{
            root: clsx(classes.ratingRoot, classes.darkHidden),
          }}
        />
        <Rating
          fractions={2}
          defaultValue={Number(unit.stars)}
          count={5}
          readOnly
          size="sm"
          emptySymbol={<svg />}
          color={
            {
              rustic: 'gray.0',
              feudal: 'gray.0',
              chivalric: 'green.8',
              silver: 'blue.8',
              heroic: 'purple.8',
              golden: 'amber.8',
            }[resolvedEra]
          }
          classNames={{
            root: clsx(classes.ratingRoot, classes.lightHidden),
          }}
        />
        <Stack gap={4}>
          <LeadershipIcon className={classes.leadershipIcon} />
          <Text fz={10} fw={700} ta="center" lh={1} className={classes.leadershipText}>
            {unit.leadership}
          </Text>
        </Stack>
      </Group>
    </UnitCardBase>
  )
}
