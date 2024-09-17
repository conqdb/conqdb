import { Language } from '@/payload-types'

export const getLanguageById = (id: string, languages: Language[]): Language | null => {
  const language = languages.find((language) => language.id === id)

  return language || null
}
