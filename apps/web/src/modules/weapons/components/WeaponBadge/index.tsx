import { Badge, BadgeProps, Box, Text } from '@mantine/core'
import React from 'react'
import { getWeapons } from '../../data'
import { getLocale } from 'next-intl/server'
import { Locale } from '@/locales'
import { getWeaponById } from '../../utils/getWeaponById'
import Image from 'next/image'
import classes from './index.module.css'
import clsx from 'clsx'

interface WeaponBadgeProps extends BadgeProps {
  weaponId: string
  primary?: boolean
}

export const WeaponBadge: React.FC<WeaponBadgeProps> = async ({ weaponId, primary }) => {
  const locale = (await getLocale()) as Locale
  const weapons = await getWeapons(locale)
  const weapon = getWeaponById(weaponId, weapons)

  return (
    <Badge
      variant="default"
      fz={10}
      c="dimmed"
      leftSection={
        weapon?.icon &&
        typeof weapon?.icon === 'object' &&
        typeof weapon?.icon?.url === 'string' && (
          <Image
            src={weapon.icon.url}
            width={16}
            height={16}
            alt={weapon?.name || ''}
            className="weaponIcon"
            style={{ objectFit: 'contain', userSelect: 'none' }}
            draggable={false}
          />
        )
      }
      styles={{
        section: { marginLeft: '-0.3rem' },
      }}
      classNames={{ root: clsx({ [classes.primary]: primary }) }}
    >
      {weapon?.name}
    </Badge>
  )
}
