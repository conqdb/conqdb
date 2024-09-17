import { MAX_MASTERY_NODES } from '@/constants'
import { ValidationTranslationFunction, dummyTranslationFunction } from '@/types/validation.types'
import { z } from 'zod'

export const addUserUnitSchema = (t: ValidationTranslationFunction) =>
  z.object({
    unit: z.string().uuid(t('invalid')),
    user: z.string().uuid(t('invalid')),
    status: z.enum(['training', 'ready', 'maxed'], { message: t('invalid') }),
    favourite: z.boolean({ message: t('invalid') }),
    hasLeadershipDoc: z.boolean({ message: t('invalid') }),
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
      }),
  })

const schema = addUserUnitSchema(dummyTranslationFunction)

export type AddUserUnitSchema = z.infer<typeof schema>
