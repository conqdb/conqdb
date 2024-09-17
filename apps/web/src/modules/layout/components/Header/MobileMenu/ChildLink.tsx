'use client'
import { UnstyledButton } from '@mantine/core'
import React from 'react'
import { ChildItem } from '../menuData'
import { Link } from '@/navigation'
import clsx from 'clsx'
import classes from './index.module.css'

export const ChildLink = ({ child, children }: { child: ChildItem; children: React.ReactNode }) => {
  return (
    <UnstyledButton
      component={!child.comingSoon ? Link : undefined}
      aria-disabled={child.comingSoon ? true : false}
      tabIndex={child.comingSoon ? -1 : 0}
      href={child.url}
      className={clsx(classes.childLink, {
        [`${classes.disabled}`]: child.comingSoon,
      })}
    >
      {children}
    </UnstyledButton>
  )
}
