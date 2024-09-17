import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { Center, Container, Text, Title } from '@mantine/core'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

const Homepage = ({ params }: { params: { locale: string } }) => {
  const { locale } = params
  unstable_setRequestLocale(locale)
  return (
    <PageTemplate>
      <Container>
        <Center w="100%" mih="50vh">
          <Title fz="xl" fw={500}>
            Coming Soon&#8482;
          </Title>
        </Center>
      </Container>
    </PageTemplate>
  )
}

export default Homepage
