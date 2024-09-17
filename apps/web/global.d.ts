import { TranslationMessages } from '@/i18n'
import { TAuth, TCommon, TNavigation, TProfile, TValidation, Translation } from '@/payload-types'

type MakeAllRequired<T> = {
  [P in keyof T]-?: NonNullable<T[P]> extends infer U
    ? U extends object
      ? MakeAllRequired<U>
      : U
    : never
}

// type Messages = MakeAllRequired<Omit<Translation, 'id' | 'createdAt' | 'updatedAt'>>

type Messages = {
  common: MakeAllRequired<Omit<TCommon, 'id' | 'createdAt' | 'updatedAt'>>
  auth: MakeAllRequired<Omit<TAuth, 'id' | 'createdAt' | 'updatedAt'>>
  navigation: MakeAllRequired<Omit<TNavigation, 'id' | 'createdAt' | 'updatedAt'>>
  profile: MakeAllRequired<Omit<TProfile, 'id' | 'createdAt' | 'updatedAt'>>
  validation: MakeAllRequired<Omit<TValidation, 'id' | 'createdAt' | 'updatedAt'>>
}

declare global {
  interface IntlMessages extends Messages {}
}
