'use client'
import { Group, UnstyledButton } from '@mantine/core'
import React from 'react'
import classes from './index.module.css'
import { useLayoutStore } from '@/modules/layout/store'
import { HeaderMenuItem } from '../menuData'
import { Icon } from '@/modules/common/components/Icon'
import { IconChevronRight } from '@tabler/icons-react'
import clsx from 'clsx'

export const LinkWithChildren = ({
  item,
  children,
}: {
  item: HeaderMenuItem
  children: React.ReactNode
}) => {
  const toggle = useLayoutStore.use.toggleOpenedNavLink()
  const openedLink = useLayoutStore.use.openedNavLink()
  return (
    <UnstyledButton className={classes.link} onClick={() => toggle(item.labelKey)}>
      <Group justify="space-between" w="100%">
        {children}
        <Icon
          icon={IconChevronRight}
          size={14}
          className={clsx(classes.chevron, {
            [classes.chevronActive]: item.labelKey === openedLink,
          })}
        />
      </Group>
    </UnstyledButton>
  )
}
