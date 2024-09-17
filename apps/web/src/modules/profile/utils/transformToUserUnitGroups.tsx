import { Unit, UserUnit } from '@/payload-types'
import { defaultUserUnitSort } from './defaultUserUnitSort'

interface ExpandedUserUnit extends UserUnit {
  unit: Unit
}

export const transformToUserUnitGroups = ({
  units,
  userUnits,
}: {
  units: Unit[]
  userUnits: UserUnit[]
}): {
  melee: ExpandedUserUnit[]
  ranged: ExpandedUserUnit[]
  cavalry: ExpandedUserUnit[]
} => {
  const unitGroups: {
    melee: ExpandedUserUnit[]
    ranged: ExpandedUserUnit[]
    cavalry: ExpandedUserUnit[]
  } = {
    melee: [],
    ranged: [],
    cavalry: [],
  }
  userUnits.forEach((userUnit) => {
    const unit = units.find((unit) => unit.id === userUnit.unit)
    if (!unit) return // Return early if unit is not found

    const expandedUserUnit: ExpandedUserUnit = { ...userUnit, unit }

    if (unit?.type && typeof unit.type === 'object' && unit.type.slug === 'melee-infantry') {
      unitGroups.melee.push(expandedUserUnit)
    }

    if (unit?.type && typeof unit.type === 'object' && unit.type.slug === 'ranged-infantry') {
      unitGroups.ranged.push(expandedUserUnit)
    }

    if (unit?.type && typeof unit.type === 'object' && unit.type.slug === 'cavalry') {
      unitGroups.cavalry.push(expandedUserUnit)
    }
  })

  unitGroups.melee.sort(defaultUserUnitSort)
  unitGroups.ranged.sort(defaultUserUnitSort)
  unitGroups.cavalry.sort(defaultUserUnitSort)

  return unitGroups
}
