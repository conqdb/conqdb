import { AccessFieldArgs } from './accessField'

export const canTranslateField = ({
  args,
  fallback = false,
}: {
  args: AccessFieldArgs
  fallback?: boolean
}) => {
  const { req } = args

  if (
    req.locale &&
    req.user &&
    req.user.roles?.includes('translator') &&
    req.user.editLanguages?.includes(req.locale)
  ) {
    return true
  } else {
    return fallback
  }
}
