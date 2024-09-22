import { AccessArgs, AccessResult, User, Where } from 'payload'
import { User as UserType } from '@/payload-types'

type NonNullableRoles<T> = T extends (infer U)[] ? U : never
export type UserRole = NonNullableRoles<NonNullable<UserType['roles']>>

interface AccessTypes {
  args: AccessArgs
  adminLock?: boolean
  allowedRoles?: UserRole[]
  query?: Where
  roleOrQuery?: boolean
  requireRoleWithQuery?: boolean | Record<string, boolean | Where>
}

export const access = ({
  args,
  allowedRoles = [],
  adminLock = false,
  query,
  requireRoleWithQuery = false,
}: AccessTypes): AccessResult => {
  const user = args.req.user
  const roles = user?.roles || []

  // must be logged in to access
  if (!user) return false

  // admins gain access to everything, unless otherwise indicated with adminLock
  if (roles.includes('admin') && !adminLock) {
    return true
  }

  // If a query is provided and allowedRoles is not a factor, return the query
  if (query && (!allowedRoles || allowedRoles.length === 0)) {
    return query
  }

  // hasRole === true if user has role in allowedRoles
  const hasRole = roles.some((role) => allowedRoles?.includes(role))

  if (hasRole) {
    if (requireRoleWithQuery === false) {
      return true
    }

    if (requireRoleWithQuery === true) {
      return query ? query : false
    }

    if (typeof requireRoleWithQuery === 'object') {
      let hasBooleanResponse = null
      let roleSpecificQuery = null

      for (const role of roles) {
        if (requireRoleWithQuery[role] === false && hasBooleanResponse === null) {
          hasBooleanResponse = true
        }
        if (typeof requireRoleWithQuery[role] === 'object' && roleSpecificQuery === null) {
          roleSpecificQuery = requireRoleWithQuery[role]
        }
      }

      return hasBooleanResponse
        ? true
        : roleSpecificQuery
          ? roleSpecificQuery
          : query
            ? query
            : false
    }
  }

  return false
}
