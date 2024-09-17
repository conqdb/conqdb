import { Inter, Noto_Sans_Arabic } from 'next/font/google'

const latin = Inter({
  display: 'swap',
  subsets: ['latin'],
})

const latinExt = Inter({
  display: 'swap',
  subsets: ['latin-ext'],
})

const cyrillic = Inter({
  display: 'swap',
  subsets: ['cyrillic'],
})

const arabic = Noto_Sans_Arabic({
  display: 'swap',
  subsets: ['arabic'],
})

export const selectFont = (locale: string) => {
  return (
    {
      ar: arabic,
      cz: latinExt,
      de: latinExt,
      pl: latinExt,
      ru: cyrillic,
      tr: latinExt,
    }[locale] || latin
  )
}
