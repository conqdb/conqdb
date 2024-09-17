import { Payload } from 'payload'
import { COLLECTION_SLUG } from '../constants'

export const seedWeapons = async (payload: Payload) => {
  await Promise.all([
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Bow',
          type: 'light',
          weight: 1,
          slug: 'bow',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Bogen',
            slug: 'bow',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Dual Blades',
          type: 'light',
          weight: 2,
          slug: 'dual-blades',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Doppelklinge',
            slug: 'dual-blades',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Short Bow',
          type: 'light',
          weight: 3,
          slug: 'short-bow',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Kurzbogen',
            slug: 'short-bow',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Chain Dart & Scimitar',
          type: 'light',
          weight: 4,
          slug: 'chain-dart-scimitar',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Kettenpfeil & Krummbsäbel',
            slug: 'chain-dart-scimitar',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Pike',
          type: 'medium',
          weight: 5,
          slug: 'pike',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Pike',
            slug: 'pike',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Musket',
          type: 'medium',
          weight: 6,
          slug: 'musket',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Muskete',
            slug: 'musket',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Nodachi',
          type: 'medium',
          weight: 7,
          slug: 'nodachi',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Nodachi',
            slug: 'nodachi',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Spear',
          type: 'medium',
          weight: 8,
          slug: 'spear',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Speer',
            slug: 'spear',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Shortsword & Shield',
          type: 'heavy',
          weight: 9,
          slug: 'short-sword-shield',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Kurzschwert',
            slug: 'short-sword-shield',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Glaive',
          type: 'heavy',
          weight: 10,
          slug: 'glaive',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Glefe',
            slug: 'glaive',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Poleaxe',
          type: 'heavy',
          weight: 11,
          slug: 'poleaxe',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Streitaxt',
            slug: 'poleaxe',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Longsword & Shield',
          type: 'heavy',
          weight: 12,
          slug: 'longsword-shield',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Langschwert',
            slug: 'longsword-shield',
          },
        })
      }),
    payload
      .create({
        collection: COLLECTION_SLUG.WEAPON,
        data: {
          name: 'Maul',
          type: 'heavy',
          weight: 13,
          slug: 'maul',
        },
      })
      .then(async (res) => {
        await payload.update({
          collection: COLLECTION_SLUG.WEAPON,
          id: res.id,
          locale: 'de',
          data: {
            name: 'Streithammer',
            slug: 'maul',
          },
        })
      }),
  ])
}
