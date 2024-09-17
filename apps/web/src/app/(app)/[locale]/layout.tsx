import React from 'react'
import '@mantine/core/styles.layer.css'
import '@mantine/carousel/styles.layer.css'
import '@mantine/notifications/styles.layer.css'
import '@mantine/spotlight/styles.layer.css'
import { selectFont } from '@/modules/layout/utils/selectFont'
import { getDirFromLocale } from '@/modules/layout/utils/getDirFromLocale'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { AppShell, ColorSchemeScript } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import './global.css'
import { Notifications } from '@mantine/notifications'
import { ThemeProvider } from '@/modules/layout/components/ThemeProvider'
import { Header } from '@/modules/layout/components/Header'
import { NextIntlClientProvider } from 'next-intl'
import pick from 'lodash.pick'

interface RootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children, params: { locale } }) => {
  const font = selectFont(locale)
  const dir = getDirFromLocale(locale)
  const messages = await getMessages()
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} dir={dir} className={`${font.className}`} suppressHydrationWarning={true}>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
      </head>
      <body>
        <NextIntlClientProvider messages={pick(messages, ['common', 'validation'])}>
          <ThemeProvider font={font}>
            <Notifications />
            <ModalsProvider>
              <AppShell header={{ height: { base: 60, md: 72 } }}>
                <Header />
                {children}
              </AppShell>
            </ModalsProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
