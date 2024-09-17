import { User } from '@/payload-types'

export const visibleFor = <T extends { roles?: User['roles'] }>(
  args: { user: T },
  allowedRoles: User['roles'],
) => {
  const user = args.user

  if (user?.roles?.includes('admin')) {
    return false
  }

  if (user?.roles?.some((role) => allowedRoles?.includes(role))) {
    return false
  } else {
    return true
  }
}
