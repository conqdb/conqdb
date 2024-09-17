import { User } from '@/payload-types'
import React from 'react'
import { UserLanguagePopover } from './UserLanguagePopover'
import { useTranslations } from 'next-intl'

export const UserLanguage = ({
  nativeLanguage,
  otherLanguages,
}: {
  nativeLanguage: User['nativeLanguage']
  otherLanguages: User['otherLanguages']
}) => {
  const t = useTranslations('profile.language')
  return (
    <UserLanguagePopover
      nativeLanguage={nativeLanguage}
      otherLanguages={otherLanguages}
      nativeLabel={t('nativeLanguage.label')}
      otherLabel={t('otherLanguages.label')}
    />
  )
}
