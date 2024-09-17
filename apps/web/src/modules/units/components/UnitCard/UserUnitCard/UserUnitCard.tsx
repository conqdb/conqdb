import { Unit } from '@/payload-types'
import React from 'react'
import { UnitCardBase } from '../UnitCardBase'
import { Badge, Box, Group, Stack, Text, Tooltip } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { IconStarFilled } from '@tabler/icons-react'
import classes from './UserUnitCard.module.css'
import clsx from 'clsx'
import LeadershipIcon from '@/modules/units/assets/leadership-icon.svg'
import { ExpandedUserUnit } from '@/modules/profile/utils/defaultUserUnitSort'
import { EditUserUnitButton } from '@/modules/profile/components/UserUnits/EditUserUnit/EditUserUnitButton'
import { MAX_MASTERY_NODES } from '@/constants'

interface UserUnitCardProps {
  userUnit: ExpandedUserUnit
  editable?: boolean
  userId?: string
}

export const UserUnitCard = ({ userUnit, userId, editable = false }: UserUnitCardProps) => {
  const { status, favourite, masteryNodes, unit } = userUnit
  const { mastery } = unit
  const t = useTranslations('profile.units')

  return (
    <UnitCardBase unit={userUnit.unit as Unit}>
      <Stack justify="space-between" h="100%">
        <Group align="flex-start" justify="space-between">
          <Group gap={4}>
            {userUnit?.hasLeadershipDoc && (
              <Tooltip label={t('hasLeadershipDoc')} position="top">
                <Box>
                  <LeadershipIcon className={classes.leadership} />
                </Box>
              </Tooltip>
            )}
            {status && (
              <Badge
                variant="default"
                size="sm"
                lh={1}
                style={{ display: 'flex' }}
                leftSection={
                  favourite && (
                    <Box>
                      <IconStarFilled className={clsx(classes.star, classes.starYellow)} />
                    </Box>
                  )
                }
              >
                {status === 'training'
                  ? t('training.label')
                  : status === 'ready'
                    ? t('ready.label')
                    : status === 'maxed'
                      ? t('maxed.label')
                      : null}
                {mastery?.hasMastery && (
                  <span>
                    {' '}
                    - {masteryNodes ?? 0}/{mastery.nodes?.length || MAX_MASTERY_NODES}
                  </span>
                )}
              </Badge>
            )}
          </Group>
          {typeof userUnit?.unit === 'object' && editable && userId && (
            <EditUserUnitButton userUnit={userUnit} />
          )}
        </Group>
      </Stack>
    </UnitCardBase>
  )
}
