import { getUserUnits } from '@/modules/profile/data'
import { getAllUnits } from '@/modules/units/data'
import { UnitType } from '@/payload-types'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'
import { AddUserUnitButton } from './AddUserUnitButton'
import { AddUserUnitsDrawer } from './AddUserUnitsDrawer'
import { Group, Stack, Tabs, TabsList, TabsTab } from '@mantine/core'
import { AddUnitsTabPanel } from './AddUserUnitsTabPanel'
import { AddUserUnitModal } from './AddUserUnitModal'
import { AddUserUnitForm } from './AddUserUnitForm'
import { StatusField } from './fields/StatusField'
import { FavouriteField } from './fields/FavouriteField'
import { HasLeadershipField } from './fields/HasLeadershipField'
import { MasteryField } from './fields/MasteryField'
import { ControlFields } from './fields/ControlFields'
import { HideOwned } from './HideOwned'
import { sortUnitGroupsWithOwnedStatus } from '@/modules/profile/utils/sortUnitGroupsWithOwnedStatus'
import { AddUserUnitProvider } from './AddUserUnitProvider'

interface AddUserUnitsProps {
  types: {
    melee: UnitType | undefined
    ranged: UnitType | undefined
    cavalry: UnitType | undefined
  }
  userId: string
}

export const AddUserUnit = async ({ types, userId }: AddUserUnitsProps) => {
  const locale = (await getLocale()) as any
  const units = await getAllUnits({ locale })
  const userUnits = await getUserUnits(userId)
  const t = await getTranslations('profile.units')
  const tc = await getTranslations('common.actions')
  const { melee, ranged, cavalry } = types

  const data = sortUnitGroupsWithOwnedStatus({ units, userUnits })

  return (
    <>
      <AddUserUnitButton>{t('addUnits')}</AddUserUnitButton>
      <AddUserUnitsDrawer title={t('addUnits')}>
        <Tabs defaultValue={melee?.id ?? 'melee'} variant="default">
          <TabsList>
            <TabsTab value={melee?.id || 'melee'}>{melee?.name}</TabsTab>
            <TabsTab value={ranged?.id ?? 'ranged'}>{ranged?.name}</TabsTab>
            <TabsTab value={cavalry?.id ?? 'cavalry'}>{cavalry?.name}</TabsTab>
            <HideOwned label={t('hideOwned')} />
          </TabsList>
          <AddUnitsTabPanel data={data.melee} value={melee?.id || 'melee'} userId={userId} />
          <AddUnitsTabPanel data={data.ranged} value={ranged?.id || 'ranged'} userId={userId} />
          <AddUnitsTabPanel data={data.cavalry} value={cavalry?.id || 'cavalry'} userId={userId} />
        </Tabs>
        <AddUserUnitModal label={t('addUnit')}>
          <AddUserUnitProvider userId={userId}>
            <AddUserUnitForm>
              <Stack>
                <StatusField
                  label={t('status')}
                  status={{
                    training: {
                      label: t('training.label'),
                      description: t('training.description'),
                    },
                    ready: { label: t('ready.label'), description: t('ready.description') },
                    maxed: { label: t('maxed.label'), description: t('maxed.description') },
                  }}
                />
                <Group>
                  <FavouriteField label={t('favourite')} />
                  <HasLeadershipField label={t('hasLeadershipDoc')} />
                </Group>
                <MasteryField label={t('unlockedMasteryNodes')} max={t('max')} />
                <ControlFields save={tc('save')} cancel={tc('cancel')} />
              </Stack>
            </AddUserUnitForm>
          </AddUserUnitProvider>
        </AddUserUnitModal>
      </AddUserUnitsDrawer>
    </>
  )
}
