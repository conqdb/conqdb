import { ComponentType } from 'react'
import { iconMap } from './iconMap'

interface BaseMenuItem {
  labelKey: string
}

export interface ChildItem extends BaseMenuItem {
  url: string
  descriptionKey: string
  icon: keyof typeof iconMap
  comingSoon?: boolean
}

interface CallToAction {
  titleKey: string
  descriptionKey: string
  btnLabelKey: string
  url: string
}

interface RootItemWithoutChildren extends BaseMenuItem {
  url: string
  children?: never
}

interface RootItemWithChildren extends BaseMenuItem {
  url?: never
  children: ChildItem[]
  callToAction?: CallToAction
}

export type HeaderMenuItem = RootItemWithChildren | RootItemWithoutChildren

export type HeaderMenu = HeaderMenuItem[]

export const headerMenu: HeaderMenu = [
  {
    labelKey: 'news.label',
    url: '/news',
  },
  {
    labelKey: 'units.label',
    children: [
      {
        labelKey: 'units.allUnits.label',
        descriptionKey: 'units.allUnits.description',
        url: '/units',
        icon: 'IconBadges',
      },
      {
        labelKey: 'units.doctrines.label',
        descriptionKey: 'units.doctrines.description',
        url: '/doctrines',
        icon: 'IconShieldUp',
        comingSoon: true,
      },
      {
        labelKey: 'units.guides.label',
        descriptionKey: 'units.guides.description',
        url: '/guides/units',
        icon: 'IconBook',
        comingSoon: true,
      },
      {
        labelKey: 'units.tierList.label',
        descriptionKey: 'units.tierList.description',
        url: '/tier-list/units',
        icon: 'IconTableShare',
        comingSoon: true,
      },
    ],
  },
  {
    labelKey: 'weapons.label',
    children: [
      {
        labelKey: 'weapons.allWeapons.label',
        descriptionKey: 'weapons.allWeapons.description',
        url: '/weapons',
        icon: 'IconSwords',
        comingSoon: true,
      },
      {
        labelKey: 'weapons.guides.label',
        descriptionKey: 'weapons.guides.description',
        url: '/guides/weapons',
        icon: 'IconBook',
        comingSoon: true,
      },
      {
        labelKey: 'weapons.tierList.label',
        descriptionKey: 'weapons.tierList.description',
        url: '/tier-list/weapons',
        icon: 'IconTableShare',
        comingSoon: true,
      },
    ],
  },
  {
    labelKey: 'tools.label',
    children: [
      {
        labelKey: 'tools.leadershipCalculator.label',
        descriptionKey: 'tools.leadershipCalculator.description',
        url: '/tools/leadership-calculator',
        icon: 'IconAbacus',
        comingSoon: true,
      },
      {
        labelKey: 'tools.unitXpCalculator.label',
        descriptionKey: 'tools.unitXpCalculator.description',
        url: '/tools/unit-xp-calculator',
        icon: 'IconHourglass',
        comingSoon: true,
      },
      {
        labelKey: 'tools.scrimPlanner.label',
        descriptionKey: 'tools.scrimPlanner.description',
        url: '/tools/scrim-planner',
        icon: 'IconListCheck',
        comingSoon: true,
      },
    ],
  },
]
