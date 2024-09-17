import { defaultUnitSort } from '@/modules/units/utils/defaultUnitSort'
import { Unit, UserUnit } from '@/payload-types'

export interface UnitWithOwnedStatus extends Unit {
  owned: boolean
}
export const sortUnitGroupsWithOwnedStatus = ({
  units,
  userUnits,
}: {
  units: Unit[]
  userUnits: UserUnit[]
}): {
  melee: UnitWithOwnedStatus[]
  ranged: UnitWithOwnedStatus[]
  cavalry: UnitWithOwnedStatus[]
} => {
  // Create a Set of owned unit IDs for faster lookup
  const ownedUnitIds = new Set(
    userUnits.map((userUnit) =>
      typeof userUnit.unit === 'object' ? userUnit.unit.id : userUnit.unit,
    ),
  )

  // Create arrays to store units by type
  const meleeUnits: Unit[] = []
  const rangedUnits: Unit[] = []
  const cavalryUnits: Unit[] = []

  // Single pass through units to categorize and add 'owned' property
  for (const unit of units) {
    const updatedUnit = {
      ...unit,
      owned: ownedUnitIds.has(unit.id),
    }

    if (updatedUnit.type && typeof updatedUnit.type === 'object') {
      switch (updatedUnit.type.slug) {
        case 'melee-infantry':
          meleeUnits.push(updatedUnit)
          break
        case 'ranged-infantry':
          rangedUnits.push(updatedUnit)
          break
        case 'cavalry':
          cavalryUnits.push(updatedUnit)
          break
      }
    }
  }

  // Sort each category
  return {
    melee: meleeUnits.sort(defaultUnitSort) as UnitWithOwnedStatus[],
    ranged: rangedUnits.sort(defaultUnitSort) as UnitWithOwnedStatus[],
    cavalry: cavalryUnits.sort(defaultUnitSort) as UnitWithOwnedStatus[],
  }
}
