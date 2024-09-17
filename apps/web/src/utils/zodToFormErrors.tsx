import { z } from 'zod'

export const zodToFormErrors = (zodError: z.ZodError): Record<string, string> => {
  const mantineErrors: Record<string, string> = {}

  zodError.issues.forEach((issue) => {
    const path = issue.path.join('.')
    if (!mantineErrors[path]) {
      mantineErrors[path] = issue.message
    }
  })

  return mantineErrors
}
