import { useTranslations } from 'next-intl'

export type ValidationTranslationFunction = ReturnType<typeof useTranslations<'validation'>>

//dummy util function to generate schema types that have a validation translation function
export const dummyTranslationFunction: ValidationTranslationFunction = ((key: string) =>
  key) as ValidationTranslationFunction
