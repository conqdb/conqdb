import { z } from 'zod'
import {
  leadershipField,
  levelField,
  usernameField,
  uuidArrayField,
  uuidField,
  weaponsField,
} from '../../profile.schema'
import { ValidationTranslationFunction, dummyTranslationFunction } from '@/types/validation.types'

export const editProfileSchema = (t: ValidationTranslationFunction) =>
  z
    .object({
      username: usernameField(t).optional(),
      level: levelField(t),
      nativeLanguage: uuidField(t),
      otherLanguages: uuidArrayField(t),
      lightLeadership: leadershipField(t),
      mediumLeadership: leadershipField(t),
      heavyLeadership: leadershipField(t),
      weapons: weaponsField(t),
    })
    .partial()

const schema = editProfileSchema(dummyTranslationFunction)

export type EditProfileSchema = z.infer<typeof schema>
