import { User } from '@/payload-types'

export const formatInitialProfileValues = (values: User) => {
  return {
    username: `${values.username}`,
    level: (values?.level || '') as number | null,
    nativeLanguage: `${
      typeof values?.nativeLanguage === 'object'
        ? values?.nativeLanguage?.id
        : values?.nativeLanguage
    }`,
    otherLanguages:
      values.otherLanguages?.map((lang) => `${typeof lang === 'object' ? lang.id : lang}`) || [],
    lightLeadership: (values?.lightLeadership || '') as number | null,
    mediumLeadership: (values?.mediumLeadership || '') as number | null,
    heavyLeadership: (values?.heavyLeadership || '') as number | null,
    weapons:
      values?.weapons?.map((weapon) => {
        return (
          weapon &&
          typeof weapon === 'object' &&
          typeof weapon?.id === 'string' &&
          typeof weapon.weapon === 'object' &&
          (typeof weapon.leadership === 'number' || weapon.leadership === null) && {
            id: weapon.id,
            weapon: weapon?.weapon?.id,
            leadership: weapon?.leadership || null,
          }
        )
      }) ?? [],
  }
}
