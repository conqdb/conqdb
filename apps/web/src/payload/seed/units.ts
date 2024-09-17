import { Payload } from 'payload'
import { COLLECTION_SLUG } from '../constants'
import { slugToCamelCase } from '../utils/slugToCamelCase'

type Map = {
  [key: string]: string
}

export const seedUnits = async (payload: Payload) => {
  try {
    const era = await payload
      .find({
        collection: COLLECTION_SLUG.UNIT_ERA,
        limit: 0,
      })
      .then((res) => {
        return res.docs.reduce<Map>((acc, doc) => {
          if (doc?.slug && typeof doc.slug === 'string') {
            acc[slugToCamelCase(doc.slug)] = doc.id
          }
          return acc
        }, {})
      })

    const category = await payload
      .find({
        collection: COLLECTION_SLUG.UNIT_CATEGORY,
        limit: 0,
      })
      .then((res) => {
        return res.docs.reduce<Map>((acc, doc) => {
          if (doc?.slug && typeof doc?.slug === 'string') {
            acc[slugToCamelCase(doc.slug)] = doc.id
          }

          return acc
        }, {})
      })

    const type = await payload
      .find({
        collection: COLLECTION_SLUG.UNIT_TYPE,
        limit: 0,
      })
      .then((res) => {
        return res.docs.reduce<Map>((acc, doc) => {
          if (doc?.slug && typeof doc?.slug === 'string') {
            acc[slugToCamelCase(doc.slug)] = doc.id
          }

          return acc
        }, {})
      })

    if (
      Object.keys(era).length === 0 ||
      Object.keys(category).length === 0 ||
      Object.keys(type).length === 0
    ) {
      return
    }

    console.log(`era: ${JSON.stringify(era)}`)
    console.log(`category: ${JSON.stringify(category)}`)
    console.log(`type: ${JSON.stringify(type)}`)

    await Promise.all([
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Village Watchmen',
          leadership: 30,
          stars: 0.5,
          maxLevel: 12,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.rustic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Martellatori',
          leadership: 30,
          stars: 0.5,
          maxLevel: 13,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.rustic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Woodcutters',
          leadership: 40,
          stars: 0.5,
          maxLevel: 12,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.rustic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Tenant Farmers',
          leadership: 40,
          stars: 0,
          maxLevel: 10,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.rustic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Serfs',
          leadership: 40,
          stars: 0,
          maxLevel: 10,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.rustic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Archer Militia',
          leadership: 45,
          stars: 1,
          maxLevel: 12,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.feudal,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Levy Bowmen',
          leadership: 50,
          stars: 1.5,
          maxLevel: 13,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.feudal,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Demesne Pikemen',
          leadership: 55,
          stars: 1,
          maxLevel: 12,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.feudal,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Black Dragon Archers',
          leadership: 60,
          stars: 2.5,
          maxLevel: 20,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Alchemists',
          leadership: 60,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Sword Militia',
          leadership: 65,
          stars: 1,
          maxLevel: 12,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.rustic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Spear Militia',
          leadership: 80,
          stars: 1.5,
          maxLevel: 14,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.rustic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Sea Stag Deathdealers',
          leadership: 80,
          stars: 3,
          maxLevel: 20,
          type: type.rangedInfantry,
          category: category.arquebusier,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Black Dragon Javelineers',
          leadership: 80,
          stars: 3,
          maxLevel: 20,
          type: type.meleeInfantry,
          category: category.javelin,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Black Dragon Pikemen',
          leadership: 80,
          stars: 3.5,
          maxLevel: 20,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Black Dragon Spearmen',
          leadership: 80,
          stars: 3.5,
          maxLevel: 20,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Ironcap Bowriders',
          leadership: 90,
          stars: 2,
          maxLevel: 18,
          type: type.cavalry,
          category: category.archer,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'A Hundred Paces',
                description: 'Increases weapons range by 8%.',
              },
              {
                title: 'Pierced',
                description: 'Increases piercing armour penetration by 90 points.',
              },
              {
                title: 'A Hundred Paces',
                description: 'Increases weapons range by 8%.',
              },
              {
                title: 'Cold Blood',
                description: 'Increases piercing damage by 100 points.',
              },
              {
                title: 'Ammunition',
                description: 'Grants 10 ammo as a reward each time an enemy is defeated.',
              },
              {
                title: 'Rain Death',
                description: 'Increases damage dealt to infantry by 150 points.',
              },
              {
                title: 'Holy Light',
                description:
                  'While Double Shots is in effect, increases damage dealt by 200 points.',
              },
              {
                title: 'Diversion',
                description:
                  'Bedevil effect is doubled. When triggered, 10% maximum health is restored within 3 seconds.',
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Demesne Archers',
          leadership: 90,
          stars: 2,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Bagpipers',
          leadership: 90,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Rattan Pikemen',
          leadership: 95,
          stars: 2,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'Rudimentary Medicine',
                description: 'Increases health by 360 points.',
              },
              {
                title: 'Thick Armour',
                description: 'Increases slashing defence by 80 points.',
              },
              {
                title: 'Rudimentary Medicine',
                description: 'Increases health by 450 points.',
              },
              {
                title: 'Thick Armour',
                description: 'Increases slashing defence by 80 points',
              },
              {
                title: 'Rattan Poison',
                description:
                  "Every 2 attacks will release an area-effect poison that reduces the enemy's movement speed and damage, causing them to bleed continuously. Note that this effect does not stack.",
              },
              {
                title: 'Guild Armour',
                description: 'Damage taken from infantry units is reduced by 300 points.',
              },
              {
                title: 'Fully Trained',
                description:
                  'Damage taken from four-star and five-star units is reduced by 300 points',
              },
              {
                title: 'Indirect Methods',
                description:
                  "Rattan Poison causes an additional 20% reduction to the target's movement speed and damage output.",
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Ironcap Swordsmen',
          leadership: 100,
          stars: 2,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'Quick',
                description: 'Increases movement speed by 8%.',
              },
              {
                title: 'Swordsmen',
                description: 'Increases slashing damage by 80 points.',
              },
              {
                title: 'Quick',
                description: 'Increases movement speed by 8%.',
              },
              {
                title: 'Swordsmen',
                description: 'Increases slashing damage by 100 points.',
              },
              {
                title: 'Focused',
                description:
                  "Increases Ironcap Charge's block effect by 100% and knocks back units and heroes.",
              },
              {
                title: 'Asymmetrical Warfare',
                description: 'Increases damage versus polearm units by 400 points.',
              },
              {
                title: 'Self-sacrifice',
                description: 'Increases Ironcap Charge damage by 200 points.',
              },
              {
                title: 'Fight as one',
                description:
                  'Unit cannot be dazed while using Ironcap Charge, but it is still vulnerable to other control effects.',
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Demesne Spearmen',
          leadership: 105,
          stars: 2.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: "The Soldier's Life",
                description: 'Increases health by 420.',
              },
              {
                title: 'Iron Armour',
                description: 'Increases slashing defence by 100.',
              },
              {
                title: "The Soldier's Life",
                description: 'Increases health by 450.',
              },
              {
                title: 'Iron Armour',
                description: 'Increases piercing defence by 100.',
              },
              {
                title: 'Repel',
                description: 'When pushing back enemies, deals a strike worth triple damage.',
              },
              {
                title: 'Battleline',
                description: 'Reduces damage taken from infantry units by 600 points.',
              },
              {
                title: 'Emboldened',
                description: 'Restores 360 health upon taking ranged damage.',
              },
              {
                title: 'Heavy Hits',
                description: 'Pure Attack deals 50% more damage and inflicts an extra attack.',
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Demesne Javelineers',
          leadership: 105,
          stars: 2.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.javelin,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'Sharp Points',
                description: 'Increases piercing damage by 100 points.',
              },
              {
                title: 'Pierced',
                description: 'Increases piercing armour penetration by 100 points.',
              },
              {
                title: 'Sharp Points',
                description: 'Increases piercing damage by 100 points.',
              },
              {
                title: 'Pierced',
                description: 'Increases piercing armour penetration by 100 points.',
              },
              {
                title: 'Aimed Strike',
                description:
                  "Javelins reduce the enemy units' movement speed by 80% for 4 seconds, and inflicts an additional 600 Piercing Damage.",
              },
              {
                title: 'Challenge',
                description: 'Increases javelin Piercing Damage against infantry by 600 points.',
              },
              {
                title: 'Marksmen',
                description: 'Increases javelin damage against cavalry by 600 points.',
              },
              {
                title: 'Simple Ammo',
                description: 'When any attack hits an enemy, 1 ammo will be restored.',
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Javelin Militia',
          leadership: 105,
          stars: 2,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.javelin,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'Sharp Points',
                description: 'Increases piercing damage by 80 points.',
              },
              {
                title: 'Pierced',
                description: 'Increases piercing armour penetration by 100 points.',
              },
              {
                title: 'Sharp Points',
                description: 'Increases piercing damage by 80 points.',
              },
              {
                title: 'Pierced',
                description: 'Increases piercing armour penetration by 100 points.',
              },
              {
                title: 'Efficient',
                description:
                  'When ordered to Charge, the unit will throw 1 additional javelin that does not consume ammo.',
              },
              {
                title: 'Challenge',
                description: 'Increases javelin armour penetration against infantry by 600 points.',
              },
              {
                title: 'Marksmen',
                description: 'Increases javelin damage against cavalry by 600 points.',
              },
              {
                title: 'Breakthrough',
                description:
                  'Charge is guaranteed to break blocking and can concuss enemy heroes for a short time.',
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Pike Militia',
          leadership: 110,
          stars: 2,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'Group Training',
                description: 'Increases health by 360 points.',
              },
              {
                title: 'Spear Technique',
                description: 'Increases piercing armour penetration by 80 points.',
              },
              {
                title: 'Group Training',
                description: 'Increases health by 450 points.',
              },
              {
                title: 'Spear Technique',
                description: 'Increases piercing armour penetration by 100 points.',
              },
              {
                title: 'Steadfastness',
                description:
                  'When Stand Firm deals damage, the target will be slowed by 75% for 1 second.',
              },
              {
                title: 'Anti-Cavalry Defence',
                description: 'Increases damage versus cavalry by 800 points.',
              },
              {
                title: 'Reflexes',
                description: 'Reduces damage taken from ranged units by 220 points.',
              },
              {
                title: 'Persistence',
                description:
                  'When there are fewer than 23 soldiers left, the first attack suffered will increase all defences by 300 points and damage values by 300 points, for 10 seconds.',
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Demesne Crossbowmen',
          leadership: 110,
          stars: 2,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.crossbowman,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Ironcap Archers',
          leadership: 110,
          stars: 2.5,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Coutiliers',
          leadership: 115,
          stars: 2.5,
          maxLevel: 18,
          type: type.cavalry,
          category: category.lancer,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Rattan Roundshields',
          leadership: 115,
          stars: 2.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'Rudimentary Medicine',
                description: 'Increases health by 360 points.',
              },
              {
                title: 'Thick Armour',
                description: 'Increases slashing defence by 80 points.',
              },
              {
                title: 'Rudimentary Medicine',
                description: 'Increases health by 450 points.',
              },
              {
                title: 'Thick Armour',
                description: 'Increases slashing defence by 80 points.',
              },
              {
                title: 'Rattan Poison',
                description:
                  "Every 2 attacks will release an area-effect poison that reduces the enemy's movement speed and damage, causing them to bleed continuously. Note that this effect does not stack.",
              },
              {
                title: 'Guild Armour',
                description: 'Damage taken from infantry units is reduced by 300 points.',
              },
              {
                title: 'Fully Trained',
                description:
                  'Damage taken from four-star and five-star units is reduced by 300 points.',
              },
              {
                title: 'Indirect Methods',
                description:
                  "Rattan Poison causes an additional 20% reduction to the target's movement speed and damage output.",
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Ironcap Scout Cavalry',
          leadership: 120,
          stars: 2.5,
          maxLevel: 18,
          type: type.cavalry,
          category: category.melee,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
            nodes: [
              {
                title: 'Finely Forged',
                description: 'Increases slashing armour penetration by 100 points.',
              },
              {
                title: 'Rudimentary Medicine',
                description: 'Increases health by 240 points.',
              },
              {
                title: 'Swordsmen',
                description: 'Increases slashing damage by 70 points.',
              },
              {
                title: 'Rudimentary Medicine',
                description: 'Increases health by 390 points.',
              },
              {
                title: 'Rampage',
                description:
                  'Grants the Rampage skill. Ironcap Scout Cavalry launches several charges against the current target and attacks other enemies along the way. This skill deals 50% less damage to heroes and its cooldown cannot be reduced by doctrines.',
              },
              {
                title: 'Aimed Strike',
                description: 'Increases damage against call ranged units by 150 points.',
              },
              {
                title: 'Group Training',
                description: 'Increases charge damage by 300 points.',
              },
              {
                title: 'Military Dressage',
                description:
                  'Reduces the cooldown of Rampage by 5 seconds and increases its duration by 3 seconds.',
              },
            ],
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Ironcap Arquebusiers',
          leadership: 120,
          stars: 2.5,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.arquebusier,
          era: era.chivalric,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Ironcap Spearmen',
          leadership: 135,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Khorchins',
          leadership: 140,
          stars: 3,
          maxLevel: 18,
          type: type.cavalry,
          category: category.archer,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Cudgel Monks',
          leadership: 145,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Ronin',
          leadership: 145,
          stars: 3.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Selemchid Cavalry',
          leadership: 150,
          stars: 3,
          maxLevel: 18,
          type: type.cavalry,
          category: category.melee,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Vanguard Archers',
          leadership: 150,
          stars: 3.5,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Mace Sergeants',
          leadership: 150,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Rattan Vipers',
          leadership: 155,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Squires',
          leadership: 155,
          stars: 3.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Wuxing Pikemen',
          leadership: 155,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Condottieri Guards',
          leadership: 160,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Demesne Arbalists',
          leadership: 160,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.crossbowman,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Halberdiers',
          leadership: 165,
          stars: 3.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Prefecture Pikemen',
          leadership: 165,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Landsknechts',
          leadership: 165,
          stars: 3.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Sons of Fenrir',
          leadership: 165,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Dimachaeri',
          leadership: 165,
          stars: 3,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Schutzdieners',
          leadership: 165,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Demesne Arquebusiers',
          leadership: 170,
          stars: 3.5,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.arquebusier,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Prefecture Guards',
          leadership: 170,
          stars: 3.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Jangjus',
          leadership: 170,
          stars: 3.5,
          maxLevel: 18,
          type: type.meleeInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Rattan Marksmen',
          leadership: 175,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.crossbowman,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Zykalian Militia',
          leadership: 175,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.special,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Incendiary Archers',
          leadership: 180,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Namkhan Archers',
          leadership: 180,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Prefecture Archers',
          leadership: 180,
          stars: 3,
          maxLevel: 18,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Janissaries',
          leadership: 180,
          stars: 3.5,
          maxLevel: 19,
          type: type.rangedInfantry,
          category: category.arquebusier,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Outriders',
          leadership: 180,
          stars: 3,
          maxLevel: 18,
          type: type.cavalry,
          category: category.javelin,
          era: era.silver,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Grayhair Garrison',
          leadership: 200,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.special,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Spear Sergeants',
          leadership: 215,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Men-at-Arms',
          leadership: 215,
          stars: 4.5,
          maxLevel: 20,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Khevtuul Cavalry',
          leadership: 215,
          stars: 4,
          maxLevel: 24,
          type: type.cavalry,
          category: category.special,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Sipahis',
          leadership: 215,
          stars: 4.5,
          maxLevel: 24,
          type: type.cavalry,
          category: category.special,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Yeomen',
          leadership: 225,
          stars: 4,
          maxLevel: 24,
          type: type.cavalry,
          category: category.lancer,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Prefecture Heavy Cavalry',
          leadership: 225,
          stars: 4,
          maxLevel: 24,
          type: type.cavalry,
          category: category.melee,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Tseregs',
          leadership: 225,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Azaps',
          leadership: 225,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Banner Guards',
          leadership: 225,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Halberdier Sergeants',
          leadership: 230,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Palace Guards',
          leadership: 230,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Javelin Sergeants',
          leadership: 230,
          stars: 4,
          maxLevel: 12,
          type: type.meleeInfantry,
          category: category.javelin,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Axe Raiders',
          leadership: 230,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.special,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Huskarls',
          leadership: 230,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Kriegsbruders',
          leadership: 230,
          stars: 4.5,
          maxLevel: 24,
          type: type.cavalry,
          category: category.melee,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Fortebraccio Pikemen',
          leadership: 235,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Imperial Archers',
          leadership: 235,
          stars: 4,
          maxLevel: 24,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Symmachean Paladins',
          leadership: 235,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Armiger Lancers',
          leadership: 235,
          stars: 4,
          maxLevel: 24,
          type: type.cavalry,
          category: category.lancer,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Claymores',
          leadership: 235,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.special,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Camel Lancers',
          leadership: 235,
          stars: 4,
          maxLevel: 24,
          type: type.cavalry,
          category: category.special,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Onna Musha',
          leadership: 235,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Imperial Pike Guards',
          leadership: 240,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Imperial Spear Guards',
          leadership: 240,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Imperial Javelineers',
          leadership: 240,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.javelin,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Symmachean Stalwarts',
          leadership: 240,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Dagger Axe Lancers',
          leadership: 245,
          stars: 4.5,
          maxLevel: 24,
          type: type.cavalry,
          category: category.lancer,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Vassal Longbowmen',
          leadership: 245,
          stars: 4.5,
          maxLevel: 24,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Kriegsrat Fusiliers',
          leadership: 245,
          stars: 4.5,
          maxLevel: 24,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Imperial Arquebusiers',
          leadership: 245,
          stars: 4,
          maxLevel: 24,
          type: type.rangedInfantry,
          category: category.arquebusier,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
          mastery: {
            hasMastery: true,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Berserkers',
          leadership: 245,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.special,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Myrmillones',
          leadership: 245,
          stars: 4,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Crescent Monks',
          leadership: 250,
          stars: 4.5,
          maxLevel: 24,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.heroic,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Pavise Crossbowmen',
          leadership: 280,
          stars: 5,
          maxLevel: 30,
          type: type.rangedInfantry,
          category: category.crossbowman,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Tercio Arquebusiers',
          leadership: 280,
          stars: 5,
          maxLevel: 30,
          type: type.rangedInfantry,
          category: category.arquebusier,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Shieldmaidens',
          leadership: 280,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.towerShield,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Fire Lancers',
          leadership: 285,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Varangian Guard',
          leadership: 290,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.bucklerShield,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Rattan Rangers',
          leadership: 295,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Monastic Knights',
          leadership: 295,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.lancer,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Hashashins',
          leadership: 295,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Orochi Samurai',
          leadership: 295,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Iron Reapers',
          leadership: 300,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Kheshigs',
          leadership: 300,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.melee,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Falconetti Gunners',
          leadership: 300,
          stars: 5,
          maxLevel: 30,
          type: type.rangedInfantry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Silahdars',
          leadership: 300,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Siphonarioi',
          leadership: 300,
          stars: 5,
          maxLevel: 30,
          type: type.rangedInfantry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Cataphract Lancers',
          leadership: 305,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.lancer,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Winged Hussars',
          leadership: 305,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.lancer,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Retiarii',
          leadership: 305,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.javelin,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Modao Battalion',
          leadership: 310,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.polearm,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Houndsmen',
          leadership: 310,
          stars: 5,
          maxLevel: 30,
          type: type.rangedInfantry,
          category: category.archer,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Zweihanders',
          leadership: 310,
          stars: 5,
          maxLevel: 30,
          type: type.meleeInfantry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Liaos Rangers',
          leadership: 315,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Shenji Grenadiers',
          leadership: 315,
          stars: 5,
          maxLevel: 30,
          type: type.rangedInfantry,
          category: category.arquebusier,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Yanyuedao Cavalry',
          leadership: 320,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.special,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
      payload.create({
        collection: COLLECTION_SLUG.UNIT,
        data: {
          name: 'Chevaliers',
          leadership: 340,
          stars: 5,
          maxLevel: 30,
          type: type.cavalry,
          category: category.lancer,
          era: era.golden,
          imageSettings: {
            x: 0,
            y: 0,
            scale: 1,
          },
        },
      }),
    ])
  } catch (error) {
    console.error(error)
  }
}
