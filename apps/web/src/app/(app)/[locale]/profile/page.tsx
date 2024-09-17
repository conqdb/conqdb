import { validateRequest } from '@/lib/lucia'
import { redirect } from '@/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'

const ProfilePage = async ({ params }: { params: { locale: string } }) => {
  const { locale } = params
  unstable_setRequestLocale(locale)
  const req = await validateRequest()

  if (req.session) {
    if (req.user.slug) {
      redirect(`/profile/${req.user.slug}`)
    } else {
      redirect(`/create-profile`)
    }
  } else {
    redirect('/sign-in')
  }
}

export default ProfilePage
