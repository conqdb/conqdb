'use client'
import React from 'react'
import { ChildItem } from '../menuData'
import { Box, Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { Link } from '@/navigation'
import clsx from 'clsx'
import classes from './index.module.css'
import { Icon } from '@/modules/common/components/Icon'
import { iconMap } from '../iconMap'

export const MenuItemChildCard = ({
  label,
  description,
  item,
}: {
  label: string
  description: string
  item: ChildItem
}) => {
  return (
    <UnstyledButton
      // ref={ref}
      component={!item.comingSoon ? Link : undefined}
      aria-disabled={item.comingSoon ? true : false}
      tabIndex={item.comingSoon ? -1 : 0}
      href={item.url}
      className={clsx(classes.childLink, {
        [`${classes.disabled}`]: item.comingSoon,
      })}
    >
      <Group align="flex-start" wrap="nowrap">
        <ThemeIcon size={34} variant="default" radius="md" className={classes.childIcon}>
          <Icon icon={iconMap[item.icon]} size={22} />
        </ThemeIcon>
        <Box>
          <Text size="sm" fw={500} className={classes.childLabel}>
            {label}
          </Text>
          {item?.comingSoon ? (
            <Text fz={10} lh={1} tt="uppercase" fw={600} mb={3} className={classes.comingSoon}>
              Coming Soon
            </Text>
          ) : undefined}
          <Text size="xs" c="dimmed" className={classes.childDescription}>
            {description}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  )
}
