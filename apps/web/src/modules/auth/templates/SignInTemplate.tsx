import { PrefixWithBG } from '@/modules/profile/components/PrefixWithBg'
import { Card, Container, Text, Title } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'
import { DiscordLoginButton } from '../components/DiscordLoginButton'
import { Anchor } from '@/modules/common/components/Anchor'

export const SignInTemplate = () => {
  const t = useTranslations('auth')
  return (
    <PrefixWithBG>
      <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Card p="xl" maw={442}>
          <Title order={1} size="xl" fw={500} ta="center">
            {t('actions.signIn')}
          </Title>
          <Text maw={372} miw={324} ta="center" c="dimmed" mx="auto" mb="lg">
            {t('signIn.subtitle')}
          </Text>
          <DiscordLoginButton size="md" style={{ alignSelf: 'center', display: 'block' }}>
            {t('signIn.signInWithDiscord')}
          </DiscordLoginButton>
          <Text ta="center" mt="lg" c="dimmed" size="xs">
            {t.rich('signIn.legalNotice', {
              link: (chunks) => (
                <Anchor c="dimmed" underline="always" href="/privacy-policy">
                  {chunks}
                </Anchor>
              ),
            })}
          </Text>
        </Card>
        <Text maw={372} ta="center" c="dimmed" mt="lg" size="sm">
          {t.rich('signIn.securityConcerns', {
            link: (chunks) => (
              <Anchor c="dimmed" underline="always" href="/security">
                {chunks}
              </Anchor>
            ),
          })}
        </Text>
      </Container>
    </PrefixWithBG>
  )
}
