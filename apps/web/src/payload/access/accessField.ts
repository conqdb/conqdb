import { User as UserType } from '@/payload-types'
import { PayloadRequest } from 'payload'

export interface AccessFieldArgs {
  data?: any
  doc?: any
  id?: number | string
  req: PayloadRequest
  siblingData?: any
}

interface AccessField {
  args: AccessFieldArgs
  adminLock?: boolean
  allowedRoles?: UserType['roles']
  condition?: () => boolean
  requireRoleWithCondition?: boolean | Record<string, false | (() => boolean)>
}
export const accessField = ({
  args,
  allowedRoles = [],
  adminLock = false,
  condition,
  requireRoleWithCondition,
}: AccessField): boolean => {
  const user = args.req.user

  //how do I fix roles type?
  const roles: UserType['roles'] = user?.roles ?? []

  if (!user) {
    return false
  }

  if (roles?.includes('admin') && !adminLock) {
    return true
  }

  if (condition && (!allowedRoles || allowedRoles.length === 0)) {
    return condition()
  }

  const hasRole = roles.some((role) => allowedRoles?.includes(role))

  if (hasRole) {
    if (requireRoleWithCondition === false) {
      return true
    }

    if (requireRoleWithCondition === true) {
      return condition ? condition() : false
    }

    if (typeof requireRoleWithCondition === 'object') {
      let hasBooleanResponse = null
      let roleSpecificCondition = null

      for (const role of roles) {
        if (requireRoleWithCondition[role] === false && hasBooleanResponse === null) {
          hasBooleanResponse = true
        }

        if (
          typeof requireRoleWithCondition[role] === 'function' &&
          roleSpecificCondition === null
        ) {
          roleSpecificCondition = requireRoleWithCondition[role]
        }
      }

      return hasBooleanResponse
        ? true
        : roleSpecificCondition
        ? roleSpecificCondition()
        : condition
        ? condition()
        : false
    }
  }

  return false
}
