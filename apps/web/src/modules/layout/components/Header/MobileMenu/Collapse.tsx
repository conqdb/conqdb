'use client'
import { Collapse as MantineCollapse } from '@mantine/core'
import React from 'react'
import { HeaderMenuItem } from '../menuData'
import { useLayoutStore } from '@/modules/layout/store'

export const Collapse = ({
  item,
  children,
}: {
  item: HeaderMenuItem
  children: React.ReactNode
}) => {
  const currentLink = useLayoutStore.use.openedNavLink()
  return <MantineCollapse in={item.labelKey === currentLink}>{children}</MantineCollapse>
}
