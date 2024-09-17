import { Unit } from '@/payload-types'
import { eraOrder } from '@/modules/units/utils/eraOrder'

export const defaultUnitSort = (a: Unit, b: Unit): number => {
  const eraComparison =
    eraOrder[(typeof a.era === 'object' && a.era?.slug!) || ''] -
    eraOrder[(typeof b.era === 'object' && b.era?.slug!) || '']
  if (eraComparison !== 0) return eraComparison

  const leadershipComparison = b.leadership - a.leadership
  if (leadershipComparison !== 0) return leadershipComparison

  return a.name.localeCompare(b.name)
}
