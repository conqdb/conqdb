'use client'
import { Link } from '@/navigation'
import { MenuItem, MenuItemProps } from '@mantine/core'
import React from 'react'

interface MenuItemLinkProps extends MenuItemProps {
  children?: React.ReactNode
  href: string
}

export const MenuItemLink: React.FC<MenuItemLinkProps> = ({ children, href, ...props }) => {
  return (
    <MenuItem component={Link} href={href} {...props}>
      {children}
    </MenuItem>
  )
}
