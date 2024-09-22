import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { Center, Container, Title } from '@mantine/core'
import { useTranslations } from 'next-intl'
import React from 'react'

const RootNotFoundPage = () => {
  const t = useTranslations('common.responses')
  return (
    <PageTemplate>
      <Container>
        <Center h={372} w="100%">
          <Title fw={500}>404: {t('notFound')}</Title>
        </Center>
      </Container>
    </PageTemplate>
  )
}

export default RootNotFoundPage
