import { APIError, Payload } from 'payload'
import { COLLECTION_SLUG } from '../constants'
import { seedLanguages } from './languages'
import { seedWeapons } from './weapons'
import { seedUnitCategories } from './unit-category'
import { seedUnitEras } from './unit-eras'
import { seedUnitTypes } from './unit-types'
import { seedUnits } from './units'

export const seed = async (payload: Payload) => {
  payload.logger.info('Seeding data...')

  try {
    const { totalDocs: languageCount } = await payload.count({
      collection: COLLECTION_SLUG.LANGUAGE,
    })

    const { totalDocs: weaponCount } = await payload.count({
      collection: COLLECTION_SLUG.WEAPON,
    })

    const { totalDocs: unitCategoryCount } = await payload.count({
      collection: COLLECTION_SLUG.UNIT_CATEGORY,
    })

    const { totalDocs: unitEraCount } = await payload.count({
      collection: COLLECTION_SLUG.UNIT_ERA,
    })

    const { totalDocs: unitTypeCount } = await payload.count({
      collection: COLLECTION_SLUG.UNIT_TYPE,
    })

    const { totalDocs: unitCount } = await payload.count({
      collection: COLLECTION_SLUG.UNIT,
    })

    if (!languageCount) {
      payload.logger.info('Seeding languages...')
      await seedLanguages(payload)
    }

    if (!weaponCount) {
      payload.logger.info('Seeding weapons...')
      await seedWeapons(payload)
    }

    if (!unitCategoryCount) {
      payload.logger.info('Seeding unit categories...')
      await seedUnitCategories(payload)
    }

    if (!unitEraCount) {
      payload.logger.info('Seeding unit eras...')
      await seedUnitEras(payload)
    }

    if (!unitTypeCount) {
      payload.logger.info('Seeding unit types...')
      await seedUnitTypes(payload)
    }

    if (!unitCount) {
      payload.logger.info('Seeding units...')
      await seedUnits(payload)
    }
  } catch (error) {
    throw new APIError(JSON.stringify(error))
  }
}
