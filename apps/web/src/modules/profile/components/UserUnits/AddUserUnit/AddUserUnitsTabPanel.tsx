'use client'
import React from 'react'
import { SimpleGrid, TabsPanel } from '@mantine/core'
import { AddUnitCard } from '@/modules/units/components/UnitCard/AddUnitCard'
import { useAddUserUnitStore } from './addUserUnit.store'
import { Unit } from '@/payload-types'
import { UnitWithOwnedStatus } from '@/modules/profile/utils/sortUnitGroupsWithOwnedStatus'

interface AddUnitTabPanel {
  data: UnitWithOwnedStatus[]
  value: string
  userId: string
}
export const AddUnitsTabPanel: React.FC<AddUnitTabPanel> = ({ value, data, userId }) => {
  const open = useAddUserUnitStore((state) => state.openAddUnit)
  const setTitle = useAddUserUnitStore((state) => state.setCurrentTitle)
  const setCurrentUnit = useAddUserUnitStore((state) => state.setCurrentUnit)
  const hideOwned = useAddUserUnitStore((state) => state.hideOwned)

  const handleAddUnit = (unit: Unit) => {
    setCurrentUnit(unit)
    setTitle(unit?.name)
    open()
  }

  return (
    <TabsPanel value={value} py="md">
      <SimpleGrid cols={{ base: 2, xs: 3 }} spacing="sm">
        {data?.map(
          (unit) =>
            (!hideOwned || !unit.owned) && (
              <AddUnitCard key={unit.id} unit={unit} onClick={() => handleAddUnit(unit)} />
            ),
        )}
      </SimpleGrid>
    </TabsPanel>
  )
}
