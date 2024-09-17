import type { FieldHook } from 'payload'
//@ts-ignore
import format from 'standard-slugify'

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ operation, value, originalDoc, data }) => {
    if (value === '/') {
      return value
    }

    //slug manually entered; format it.
    if (typeof value === 'string' && value?.length > 0) {
      return format(value)
    }

    if (operation === 'create' || operation === 'update') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback]

      if (fallbackData && typeof fallbackData === 'string') {
        return format(fallbackData)
      }
    }

    return value
  }
