import { validateRequest } from '@/lib/lucia'
import { SignInTemplate } from '@/modules/auth/templates/SignInTemplate'
import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { redirect } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

const SignInPage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params
  unstable_setRequestLocale(locale)

  const { user } = await validateRequest()
  if (user) {
    redirect(user?.slug ? `/profile/${user.slug}` : '/create-profile')
  }

  return (
    <PageTemplate>
      <SignInTemplate />
    </PageTemplate>
  )
}

export default SignInPage
