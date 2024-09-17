import { Locale } from '@/locales'
import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { getAllUnits } from '@/modules/units/data'
import { AllUnitsTemplate } from '@/modules/units/templates/AllUnitsTemplate'
import { Title } from '@mantine/core'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

const AllUnits = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params
  unstable_setRequestLocale(locale)
  const units = await getAllUnits({ locale } as any)

  return (
    <PageTemplate>
      <AllUnitsTemplate units={units} />
    </PageTemplate>
  )
}

export default AllUnits
