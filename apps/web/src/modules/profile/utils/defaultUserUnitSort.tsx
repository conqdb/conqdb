import { Unit, UserUnit } from '@/payload-types'
import { eraOrder } from '@/modules/units/utils/eraOrder'

export interface ExpandedUserUnit extends UserUnit {
  unit: Unit
}

// export const defaultUserUnitSort = (a: ExpandedUserUnit, b: ExpandedUserUnit): number => {
//   const eraComparison =
//     eraOrder[(typeof a.unit.era === 'object' && a.unit.era?.slug!) || ''] -
//     eraOrder[(typeof b.unit.era === 'object' && b.unit.era?.slug!) || '']
//   if (eraComparison !== 0) return eraComparison

//   const leadershipComparison = b.unit.leadership - a.unit.leadership
//   if (leadershipComparison !== 0) return leadershipComparison

//   return a.unit.name.localeCompare(b.unit.name)
// }
// Helper function to determine the training status order
const getTrainingStatusOrder = (status: string): number => {
  switch (status) {
    case 'maxed':
      return 0
    case 'ready':
      return 1
    case 'training':
      return 2
    default:
      return 3 // For any other status, place it at the end
  }
}

export const defaultUserUnitSort = (a: ExpandedUserUnit, b: ExpandedUserUnit): number => {
  // 1. Compare eras
  const eraComparison =
    eraOrder[(typeof a.unit.era === 'object' && a.unit.era?.slug!) || ''] -
    eraOrder[(typeof b.unit.era === 'object' && b.unit.era?.slug!) || '']
  if (eraComparison !== 0) return eraComparison

  // 2. Compare training status
  const trainingStatusComparison =
    getTrainingStatusOrder(a.status) - getTrainingStatusOrder(b.status)
  if (trainingStatusComparison !== 0) return trainingStatusComparison

  // 3. Compare favorite status
  if (a.favourite !== b.favourite) {
    return a.favourite ? -1 : 1
  }

  // 4. Compare leadership (higher leadership first)
  const leadershipComparison = b.unit.leadership - a.unit.leadership
  if (leadershipComparison !== 0) return leadershipComparison

  // 5. Compare names alphabetically
  return a.unit.name.localeCompare(b.unit.name)
}
