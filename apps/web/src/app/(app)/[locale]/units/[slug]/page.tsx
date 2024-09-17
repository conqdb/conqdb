import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { Title } from '@mantine/core'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

const UnitPage = ({ params }: { params: { slug: string; locale: string } }) => {
  const { slug, locale } = params
  unstable_setRequestLocale(locale)
  return (
    <PageTemplate>
      <Title>Unit Page: {slug}</Title>
    </PageTemplate>
  )
}

export default UnitPage
