import React from 'react'
import { PrefixWithBG } from '../components/PrefixWithBg'
import { Button, Card, Container, Stack, Text, Title } from '@mantine/core'
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl'
import { CreateProfileForm } from '../components/CreateProfileForm'
import { Username } from '../components/CreateProfileForm/Username'
import { IconArrowRight } from '@/modules/common/icons/IconArrowRight'
import { Slug } from '../components/CreateProfileForm/Slug'
import pick from 'lodash.pick'

export const CreateProfileTemplate = () => {
  const t = useTranslations('profile')
  const preview = useTranslations('common.actions')('preview')
  const slugT = useTranslations('profile.slug')
  const messages = useMessages()

  return (
    <NextIntlClientProvider messages={pick(messages, 'validation')}>
      <PrefixWithBG>
        <Container size={442}>
          <Card p={{ base: 'md', md: 'lg' }}>
            <CreateProfileForm invalidSlug={slugT('slugTaken')}>
              <Stack gap={0}>
                <Title size="xl" ta="center" fw={500}>
                  {t('create.title')}
                </Title>
                <Text size="sm" c="dimmed" ta="center">
                  {t('create.subtitle')}
                </Text>
              </Stack>
              <Username
                label={t('username.label')}
                placeholder={t('username.placeholder')}
                description={t('username.description')}
              />
              <Slug
                label={t('slug.label')}
                placeholder={t('slug.placeholder')}
                description={t('slug.description')}
                preview={preview}
              />
              <Button
                type="submit"
                variant="light"
                style={{ alignSelf: 'center' }}
                rightSection={<IconArrowRight size="1.2rem" />}
                mt="md"
              >
                {t('actions.createProfile')}
              </Button>
            </CreateProfileForm>
          </Card>
        </Container>
      </PrefixWithBG>
    </NextIntlClientProvider>
  )
}
