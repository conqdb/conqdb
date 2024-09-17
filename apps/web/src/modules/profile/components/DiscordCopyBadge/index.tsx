'use client'
import { Icon } from '@/modules/common/components/Icon'
import { DiscordIcon } from '@/modules/common/icons/DiscordIcon'
import { ActionIcon, Badge, Box, CopyButton, Flex, Text, Tooltip } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import React from 'react'
import classes from './index.module.css'
import { useTranslations } from 'next-intl'

interface DiscordCopyBadgeProps {
  username: string | null | undefined
}
export const DiscordCopyBadge: React.FC<DiscordCopyBadgeProps> = ({ username }) => {
  const t = useTranslations('common.actions')
  return username ? (
    <Badge
      variant="default"
      size="lg"
      leftSection={
        <Flex ml="-0.2rem">
          <DiscordIcon size="0.8rem" />
        </Flex>
      }
      rightSection={
        <CopyButton value={username} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? t('copied') : t('copy')}
              withArrow
              position="right"
              px={8}
              py={3}
              fz="xs"
              closeDelay={copied ? 720 : 172}
            >
              <ActionIcon variant="transparent" size="sm" mr="-0.4rem" ml="-0.3rem" onClick={copy}>
                {copied ? (
                  <Icon
                    icon={IconCheck}
                    size="0.8rem"
                    className={classes.copiedIcon}
                    strokeWidth={2}
                  />
                ) : (
                  <Icon
                    icon={IconCopy}
                    size="0.8rem"
                    className={classes.copyIcon}
                    strokeWidth={2}
                  />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      }
    >
      <Text tt="initial" fw={500} size="xs">
        {username}
      </Text>
    </Badge>
  ) : null
}
