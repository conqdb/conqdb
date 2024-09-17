import { Unit } from '@/payload-types'
import { defaultUnitSort } from './defaultUnitSort'

export const transformToUnitTypeGroups = ({
  units,
}: {
  units: Unit[]
}): { melee: Unit[]; ranged: Unit[]; cavalry: Unit[] } => {
  const unitGroups: { melee: Unit[]; ranged: Unit[]; cavalry: Unit[] } = {
    melee: [],
    ranged: [],
    cavalry: [],
  }
  units.forEach((unit) => {
    if (unit.type && typeof unit.type === 'object' && unit.type.slug === 'melee-infantry') {
      unitGroups.melee.push(unit)
    }

    if (unit.type && typeof unit.type === 'object' && unit.type.slug === 'ranged-infantry') {
      unitGroups.ranged.push(unit)
    }

    if (unit.type && typeof unit.type === 'object' && unit.type.slug === 'cavalry') {
      unitGroups.cavalry.push(unit)
    }
  })

  unitGroups.melee.sort(defaultUnitSort)
  unitGroups.ranged.sort(defaultUnitSort)
  unitGroups.cavalry.sort(defaultUnitSort)

  return unitGroups
}
