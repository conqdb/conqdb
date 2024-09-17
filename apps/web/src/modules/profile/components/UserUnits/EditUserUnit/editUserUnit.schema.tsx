import { MAX_MASTERY_NODES } from '@/constants'
import { dummyTranslationFunction, ValidationTranslationFunction } from '@/types/validation.types'
import { z } from 'zod'

export const editUserUnitSchema = (t: ValidationTranslationFunction) =>
  z.object({
    userUnit: z.string().uuid(t('invalid')),
    status: z.enum(['training', 'ready', 'maxed'], { message: t('invalid') }).optional(),
    favourite: z.boolean({ message: t('invalid') }).optional(),
    hasLeadershipDoc: z.boolean({ message: t('invalid') }).optional(),
    masteryNodes: z
      .union([
        z
          .string()
          .regex(/^\d+$/, t('invalid'))
          .transform((str) => parseInt(str, 10)),
        z.literal('').transform(() => null),
        z.number().nullable(),
      ])
      .refine((num) => num === null || num <= MAX_MASTERY_NODES, {
        message: t('maxNum', { num: MAX_MASTERY_NODES }),
      })
      .optional(),
  })

const schema = editUserUnitSchema(dummyTranslationFunction)

export type EditUserUnitSchema = z.infer<typeof schema>
