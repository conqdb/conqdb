import { validateRequest } from '@/lib/lucia'
import { NotFound } from '@/modules/common/components/NotFound'
import { Center } from '@mantine/core'
import { getTranslations } from 'next-intl/server'
import React from 'react'

export const UserHasNoUnits = async ({ userId }: { userId: string }) => {
  const { user } = await validateRequest()
  const t = await getTranslations('common.responses')
  const tpu = await getTranslations('profile.units')

  return user && user.id === userId ? (
    <Center>
      <p>{tpu('dontHaveUnits')}</p>
    </Center>
  ) : (
    <NotFound>{t('nothingFound')}</NotFound>
  )
}
