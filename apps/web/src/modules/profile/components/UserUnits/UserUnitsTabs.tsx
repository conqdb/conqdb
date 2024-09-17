import { Tabs, TabsList } from '@mantine/core'
import React from 'react'
import { UserUnitsTab } from './UserUnitsTab'
import { UnitType } from '@/payload-types'
import { ExpandedUserUnit } from '../../utils/defaultUserUnitSort'
import { UserUnitsTabPanel } from './UserUnitsTabPanel'
import { validateRequest } from '@/lib/lucia'
import { EditUserUnit } from './EditUserUnit'

interface UserUnitsTabsProps {
  userId: string
  melee: UnitType | undefined
  ranged: UnitType | undefined
  cavalry: UnitType | undefined
  userUnits: {
    melee: ExpandedUserUnit[]
    ranged: ExpandedUserUnit[]
    cavalry: ExpandedUserUnit[]
  }
}

export const UserUnitsTabs = async ({
  userId,
  melee,
  ranged,
  cavalry,
  userUnits,
}: UserUnitsTabsProps) => {
  const { user: currentUser } = await validateRequest()
  const canEdit = currentUser?.id === userId

  return (
    <Tabs defaultValue={melee?.id ?? 'melee'} variant="default">
      <TabsList>
        <UserUnitsTab value={melee?.id ?? 'melee'} length={userUnits?.melee?.length ?? 0}>
          {melee?.name}
        </UserUnitsTab>
        <UserUnitsTab value={ranged?.id ?? 'ranged'} length={userUnits?.ranged?.length ?? 0}>
          {ranged?.name}
        </UserUnitsTab>
        <UserUnitsTab value={cavalry?.id ?? 'cavalry'} length={userUnits?.cavalry?.length ?? 0}>
          {cavalry?.name}
        </UserUnitsTab>
      </TabsList>
      {canEdit ? (
        <EditUserUnit>
          <UserUnitsTabPanel
            value={melee?.id ?? 'melee'}
            data={userUnits.melee ?? []}
            userId={userId}
            canEdit={true}
          />
          <UserUnitsTabPanel
            value={ranged?.id ?? 'ranged'}
            data={userUnits.ranged ?? []}
            userId={userId}
            canEdit={true}
          />
          <UserUnitsTabPanel
            value={cavalry?.id ?? 'cavalry'}
            data={userUnits.cavalry ?? []}
            userId={userId}
            canEdit={true}
          />
        </EditUserUnit>
      ) : (
        <>
          <UserUnitsTabPanel
            value={melee?.id ?? 'melee'}
            data={userUnits.melee ?? []}
            userId={userId}
          />
          <UserUnitsTabPanel
            value={ranged?.id ?? 'ranged'}
            data={userUnits.ranged ?? []}
            userId={userId}
          />
          <UserUnitsTabPanel
            value={cavalry?.id ?? 'cavalry'}
            data={userUnits.cavalry ?? []}
            userId={userId}
          />
        </>
      )}
    </Tabs>
  )
}
