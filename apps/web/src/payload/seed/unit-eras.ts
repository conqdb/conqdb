import { Payload } from 'payload'

export const seedUnitEras = async (payload: Payload) => {
  await Promise.all([
    payload
      .create({
        collection: 'unit-era',
        data: {
          name: 'Rustic',
          slug: 'rustic',
          weight: 1,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-era',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Finstere',
            slug: 'rustic',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-era',
        data: {
          name: 'Feudal',
          slug: 'feudal',
          weight: 2,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-era',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Feudale',
            slug: 'feudal',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-era',
        data: {
          name: 'Chivalric',
          slug: 'chivalric',
          weight: 3,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-era',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Ritterliche',
            slug: 'chivalric',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-era',
        data: {
          name: 'Silver',
          slug: 'silver',
          weight: 4,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-era',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Silberne',
            slug: 'silver',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-era',
        data: {
          name: 'Heroic',
          slug: 'heroic',
          weight: 5,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-era',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Heroische',
            slug: 'heroic',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-era',
        data: {
          name: 'Golden',
          slug: 'golden',
          weight: 6,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-era',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Goldene',
            slug: 'golden',
          },
        })
      }),
  ])
}
