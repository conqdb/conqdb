import { Group, Skeleton, TooltipGroup } from '@mantine/core'
import React, { Suspense } from 'react'
import { LoginLink } from './LoginLink'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useTranslations } from 'next-intl'
import { Profile } from './Profile'

export const Controls = () => {
  const t = useTranslations('navigation')

  return (
    <Group align="center" justify="center" gap={12}>
      <Suspense fallback={<></>}>
        <LoginLink />
      </Suspense>
      <TooltipGroup openDelay={572} closeDelay={142}>
        <LanguageSwitcher label={t('actions.switchLanguage')} visibleFrom="md" />
        <ThemeSwitcher label={t('actions.toggleColorScheme')} visibleFrom="md" />
      </TooltipGroup>
      <Suspense fallback={<Skeleton radius="xl" w={38} h={38} />}>
        <Profile />
      </Suspense>
    </Group>
  )
}
