import { validateRequest } from '@/lib/lucia'
import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { redirect } from '@/navigation'
import { Button, Container, Text } from '@mantine/core'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

const JoinARaid = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params
  unstable_setRequestLocale(locale)
  const { user } = await validateRequest()

  if (!user) {
    redirect('/sign-in?redirect=/dashboard')
  }
  return (
    <PageTemplate>
      <Container>
        <Text>You don't belong to a raid...</Text>
        <Button>Join a Raid</Button>
      </Container>
    </PageTemplate>
  )
}

export default JoinARaid
