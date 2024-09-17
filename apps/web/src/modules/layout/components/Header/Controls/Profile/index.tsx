import { validateRequest } from '@/lib/lucia'
import React from 'react'
import {
  Avatar,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuTarget,
  UnstyledButton,
} from '@mantine/core'
import { FallbackIcon } from './FallbackIcon'
import { MenuItemLink } from '@/modules/common/components/MenuItemLink'
import { getTranslations } from 'next-intl/server'
import { Logout } from './Logout'
import { IconUser } from '@/modules/common/icons/IconUser'
import { IconUserPlus } from '@/modules/common/icons/IconUserPlus'
import { IconBell } from '@/modules/common/icons/IconBell'
import { IconTablePlus } from '@/modules/common/icons/IconTablePlus'
import { IconTable } from '@/modules/common/icons/IconTable'
import { IconUsersGroup } from '@/modules/common/icons/IconUsersGroup'

export const Profile = async () => {
  const { user } = await validateRequest()
  const t = await getTranslations('navigation.menu')
  const auth = await getTranslations('auth.actions')

  if (!user) {
    return null
  }

  return (
    <Menu trigger="click-hover">
      <MenuTarget>
        <UnstyledButton style={{ borderRadius: '50%' }} className="mantine-active">
          <Avatar src={user?.avatar || ''}>
            <FallbackIcon />
          </Avatar>
        </UnstyledButton>
      </MenuTarget>
      <MenuDropdown>
        <MenuItem leftSection={<IconBell size={16} />} disabled={true}>
          {t('notifications')}
        </MenuItem>

        {user?.slug ? (
          <MenuItemLink href={`/profile/${user?.slug}`} leftSection={<IconUser size={16} />}>
            {t('profile')}
          </MenuItemLink>
        ) : (
          <MenuItemLink href={`/create-profile`} leftSection={<IconUserPlus size={16} />}>
            {t('createProfile')}
          </MenuItemLink>
        )}
        {(user.roles?.includes('member') || user.roles?.includes('admin')) && !user?.raid && (
          <MenuItemLink
            href={'/create-raid'}
            leftSection={<IconTablePlus size={16} />}
            disabled={true}
          >
            {t('createRaid')}
          </MenuItemLink>
        )}
        {user?.raid ? (
          <MenuItemLink href="/dashboard" leftSection={<IconTable size={16} />}>
            {t('dashboard')}
          </MenuItemLink>
        ) : (
          <MenuItemLink href="/raids" leftSection={<IconUsersGroup size={16} />} disabled={true}>
            {t('joinRaid')}
          </MenuItemLink>
        )}
        <MenuDivider />
        <Logout label={auth('signOut')} />
      </MenuDropdown>
    </Menu>
  )
}
