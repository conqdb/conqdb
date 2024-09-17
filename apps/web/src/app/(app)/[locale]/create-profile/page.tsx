import { validateRequest } from '@/lib/lucia'
import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { CreateProfileTemplate } from '@/modules/profile/templates/CreateProfileTemplate'
import { redirect } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import React from 'react'

const CreateProfilePage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params
  unstable_setRequestLocale(locale)
  const { user } = await validateRequest()

  if (!user) {
    redirect('/sign-in')
  }

  if (user?.slug) {
    redirect(`/profile/${user?.slug}`)
  }
  return (
    <PageTemplate>
      <CreateProfileTemplate />
    </PageTemplate>
  )
}

export default CreateProfilePage
