import { validateRequest } from '@/lib/lucia'
import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { redirect } from '@/navigation'
import { Container, Text } from '@mantine/core'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

const DashboardPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params
  unstable_setRequestLocale(locale)

  const { user } = await validateRequest()

  if (!user) {
    redirect('/sign-in?redirect=/dashboard')
  }

  return (
    <PageTemplate>
      <Container my="xl">
        <Text>Dashboard Homepage</Text>
      </Container>
    </PageTemplate>
  )
}

export default DashboardPage
