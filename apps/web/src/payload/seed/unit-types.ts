import { Payload } from 'payload'

export const seedUnitTypes = async (payload: Payload) => {
  await Promise.all([
    payload
      .create({
        collection: 'unit-type',
        data: {
          name: 'Melee Infantry',
          slug: 'melee-infantry',
          weight: 1,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-type',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Nahkampf - Infanterie',
            slug: 'melee-infantry',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-type',
        data: {
          name: 'Ranged Infantry',
          slug: 'ranged-infantry',
          weight: 2,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-type',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Fernkampf - Infanterie',
            slug: 'ranged-infantry',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-type',
        data: {
          name: 'Cavalry',
          slug: 'cavalry',
          weight: 3,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-type',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Kavallerie',
            slug: 'cavalry',
          },
        })
      }),
  ])
}
