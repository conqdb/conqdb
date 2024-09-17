import { ValidationTranslationFunction, dummyTranslationFunction } from '@/types/validation.types'
import { z } from 'zod'
import { slugField, usernameField } from '../../profile.schema'

export const createProfileSchema = (t: ValidationTranslationFunction) =>
  z.object({
    username: usernameField(t),
    slug: slugField(t),
  })

const schema = createProfileSchema(dummyTranslationFunction)

export type CreateProfileSchema = z.infer<typeof schema>
