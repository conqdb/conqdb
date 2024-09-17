import { ValidationTranslationFunction } from '@/types/validation.types'
import { z } from 'zod'

export const uuidField = (t: ValidationTranslationFunction) => z.string().uuid(t('invalid'))

export const uuidArrayField = (t: ValidationTranslationFunction) => z.array(uuidField(t))

export const usernameField = (t: ValidationTranslationFunction) =>
  z
    .string()
    .min(1, t('required'))
    .min(4, t('minChar', { min: 4 }))
    .max(18, t('maxChar', { max: 18 }))
    .regex(/^(?!.*--)[^\s]{1,18}$/, t('invalid'))

export const slugField = (t: ValidationTranslationFunction) =>
  z
    .string()
    .min(1, t('required'))
    .min(4, t('minChar', { min: 4 }))
    .max(18, t('maxChar', { max: 18 }))
    .regex(/^(?!.*--)[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: t('invalid'),
    })

export const levelField = (t: ValidationTranslationFunction) =>
  z
    .union([
      z
        .string()
        .regex(/^\d+$/, t('invalid'))
        .transform((str) => parseInt(str, 10)),
      z.literal('').transform(() => null),
      z.number(),
    ])
    .refine((num) => num === null || num <= 999999, {
      message: t('maxNum', { num: 999999 }),
    })

export const leadershipField = (t: ValidationTranslationFunction) =>
  z
    .union([
      z
        .string()
        .regex(/^\d+$/, t('invalid'))
        .transform((str) => parseInt(str, 10)),
      z.literal('').transform(() => null),
      z.number().nullable(),
    ])
    .refine((num) => num === null || num <= 100, {
      message: t('maxNum', { num: 100 }),
    })

export const weaponsField = (t: ValidationTranslationFunction) =>
  z.array(
    z.object({
      id: z.string(),
      weapon: z.string().uuid(),
      leadership: leadershipField(t).optional(),
    }),
  )
