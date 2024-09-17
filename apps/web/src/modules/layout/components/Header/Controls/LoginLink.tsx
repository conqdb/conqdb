import React from 'react'
import classes from './LoginLink.module.css'
import { Anchor } from '@/modules/common/components/Anchor'
import { validateRequest } from '@/lib/lucia'
import clsx from 'clsx'
import { getTranslations } from 'next-intl/server'

export const LoginLink = async () => {
  const { user } = await validateRequest()

  const t = await getTranslations('auth.actions')

  if (user) {
    return null
  }

  return (
    <Anchor href={'/sign-in'} underline="never" className={clsx(classes.root, 'mantine-active')}>
      {t('signIn')}
    </Anchor>
  )
}
