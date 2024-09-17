import { Unit } from '@/payload-types'

export const getEra = (era: Unit['era']) => {
  return typeof era === 'object' &&
    era.slug &&
    (era.slug === 'rustic' ||
      era.slug === 'feudal' ||
      era.slug === 'chivalric' ||
      era.slug === 'silver' ||
      era.slug === 'heroic' ||
      era.slug === 'golden')
    ? era.slug
    : 'rustic'
}
