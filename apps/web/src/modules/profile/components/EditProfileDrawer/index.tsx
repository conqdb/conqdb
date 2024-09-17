import { validateRequest } from '@/lib/lucia'
import { User } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import React from 'react'
import { Drawer } from './Drawer'

export const EditProfileDrawer = async ({
  children,
  user,
}: {
  children: React.ReactNode
  user: User
}) => {
  const req = await validateRequest()

  if (!req.user || req?.user?.id !== user.id) {
    return null
  }

  const t = await getTranslations('profile.actions')
  const tca = await getTranslations('common.actions')

  return (
    <Drawer editProfile={t('editProfile')} save={tca('save')} cancel={tca('cancel')}>
      {children}
    </Drawer>
  )
}
