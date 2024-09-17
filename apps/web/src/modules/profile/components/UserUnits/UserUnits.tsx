import { UnitType } from '@/payload-types'
import React, { Suspense } from 'react'
import { Box, Center, Divider, Group, Title } from '@mantine/core'
import { useTranslations } from 'next-intl'
import { RenderIfSelf } from '@/modules/auth/components/RenderIfSelf'
import { ExpandedUserUnit } from '../../utils/defaultUserUnitSort'
import { UserUnitsTabs } from './UserUnitsTabs'
import { Loader } from '@mantine/core'
import { AddUserUnit } from './AddUserUnit'

interface UserUnitsProps {
  userId: string
  unitTypes: UnitType[]
  userUnits: {
    melee: ExpandedUserUnit[]
    ranged: ExpandedUserUnit[]
    cavalry: ExpandedUserUnit[]
  }
}

export const UserUnits = ({ userId, unitTypes, userUnits }: UserUnitsProps) => {
  const t = useTranslations('profile.units')
  const unitTypeMap = new Map<string, UnitType>()
  unitTypes.forEach((type) => unitTypeMap.set(type.slug ?? '', type))

  const melee = unitTypeMap.get('melee-infantry')
  const ranged = unitTypeMap.get('ranged-infantry')
  const cavalry = unitTypeMap.get('cavalry')

  return (
    <Box component="section" my={{ base: 18, xs: 24 }}>
      <Group justify="space-between">
        <Title order={2}>{t('label')}</Title>
        <Suspense fallback={<></>}>
          <RenderIfSelf userId={userId}>
            <AddUserUnit types={{ melee, ranged, cavalry }} userId={userId} />
          </RenderIfSelf>
        </Suspense>
      </Group>
      <Divider my="xs" />
      <Suspense
        fallback={
          <Center h="272">
            <Loader />
          </Center>
        }
      >
        <UserUnitsTabs
          userId={userId}
          melee={melee}
          ranged={ranged}
          cavalry={cavalry}
          userUnits={userUnits}
        />
      </Suspense>
    </Box>
  )
}
