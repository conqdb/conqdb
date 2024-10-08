import { Payload } from 'payload'

export const seedUnitCategories = async (payload: Payload) => {
  await Promise.all([
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Buckler Shield',
          slug: 'buckler-shield',
          weight: 1,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Buckler',
            slug: 'buckler-shield',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Polearm',
          slug: 'polearm',
          weight: 2,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Strangenwaffe',
            slug: 'polearm',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Tower Shield',
          slug: 'tower-shield',
          weight: 3,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Turmschild',
            slug: 'tower-shield',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Javelin',
          slug: 'javelin',
          weight: 4,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Wurfspeer',
            slug: 'javelin',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Archer',
          slug: 'archer',
          weight: 5,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Bogenschütze ',
            slug: 'archer',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Arquebusier',
          slug: 'arquebusier',
          weight: 6,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Arkebusier',
            slug: 'arquebusier',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Crossbowman',
          slug: 'crossbowman',
          weight: 7,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Armbrustchütze',
            slug: 'crossbowman',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Lancer',
          slug: 'lancer',
          weight: 8,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Lancier',
            slug: 'lancer',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Melee',
          slug: 'melee',
          weight: 9,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Nahkampf',
            slug: 'melee',
          },
        })
      }),
    payload
      .create({
        collection: 'unit-category',
        data: {
          name: 'Special',
          slug: 'special',
          weight: 10,
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: 'unit-category',
          id: res.id,
          locale: 'de',
          data: {
            name: 'Spezial',
            slug: 'special',
          },
        })
      }),
  ])
}
