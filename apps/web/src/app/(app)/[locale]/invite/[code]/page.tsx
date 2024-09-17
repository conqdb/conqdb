import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { Container, Text } from '@mantine/core'
import React from 'react'

const InvitePage = ({ params }: { params: { code: string } }) => {
  const { code } = params
  return (
    <PageTemplate>
      <Container>
        <Text>Invite: {code}</Text>
      </Container>
    </PageTemplate>
  )
}

export default InvitePage
