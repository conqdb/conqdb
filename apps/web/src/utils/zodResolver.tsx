import { zodResolver as MantineZodResolver } from 'mantine-form-zod-resolver'

export const zodResolver = (schema: any) => MantineZodResolver(schema, { errorPriority: 'first' })
