import { PageTemplate } from '@/modules/layout/templates/PageTemplate'
import { getUserBySlug, getUserUnits } from '@/modules/profile/data'
import { UserProfileTemplate } from '@/modules/profile/templates/UserProfileTemplate'
import { transformToUserUnitGroups } from '@/modules/profile/utils/transformToUserUnitGroups'
import { getAllUnits, getUnitTypes } from '@/modules/units/data'
import { Metadata } from 'next'
import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import React from 'react'

interface UserProfilePageProps {
  params: {
    slug: string
    locale: string
  }
}

export const generateMetadata = async ({ params }: UserProfilePageProps): Promise<Metadata> => {
  const { slug } = params
  const user = await getUserBySlug(slug)

  return {
    title: `${user?.username ?? 'Missing username'} | ConqDB`,
    description: `User profile for ${user?.username}.`,
  }
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const { slug, locale } = params
  unstable_setRequestLocale(locale)
  const user = await getUserBySlug(slug)

  if (user) {
    const userUnits = await getUserUnits(user.id)
    const units = await getAllUnits({ locale } as any)
    const unitTypes = await getUnitTypes({ locale } as any)
    const userUnitGroups = transformToUserUnitGroups({ units, userUnits })

    return (
      <PageTemplate>
        <UserProfileTemplate user={user} unitTypes={unitTypes} userUnits={userUnitGroups} />
      </PageTemplate>
    )
  } else {
    notFound()
  }
}

export default UserProfilePage
