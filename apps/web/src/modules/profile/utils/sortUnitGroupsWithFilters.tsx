import { Unit, UserUnit } from '@/payload-types'
import { defaultUnitSort } from '@/modules/units/utils/defaultUnitSort'

export const sortUnitGroupsWithFilters = ({
  units,
  userUnits,
  hideOwned,
}: {
  units: Unit[]
  userUnits: UserUnit[]
  hideOwned: boolean
}): { melee: Unit[]; ranged: Unit[]; cavalry: Unit[] } => {
  // Create a Set of owned unit IDs for faster lookup
  const ownedUnitIds = new Set(
    userUnits?.map((userUnit) =>
      typeof userUnit.unit === 'object' ? userUnit.unit.id : userUnit.unit,
    ),
  )

  // Create a map to store units by type
  const unitMap: { [key: string]: Unit[] } = {
    'melee-infantry': [],
    'ranged-infantry': [],
    cavalry: [],
  }

  // Single pass through units to categorize and filter
  units.forEach((unit) => {
    if (unit.type && typeof unit.type === 'object') {
      const typeSlug = unit.type.slug as keyof typeof unitMap
      if (typeSlug in unitMap && (!hideOwned || !ownedUnitIds.has(unit.id))) {
        unitMap[typeSlug].push(unit)
      }
    }
  })

  // Sort each category
  Object.values(unitMap).forEach((group) => group.sort(defaultUnitSort))

  // Return the sorted and filtered groups
  return {
    melee: unitMap['melee-infantry'],
    ranged: unitMap['ranged-infantry'],
    cavalry: unitMap['cavalry'],
  }
}
