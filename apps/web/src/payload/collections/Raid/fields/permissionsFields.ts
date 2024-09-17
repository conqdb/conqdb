import { Field } from 'payload'

interface permissionsFieldsProps {
  defaultValues?: {
    member?: {
      read?: boolean
      manage?: boolean
    }
  }
}

export const permissionsFields = ({ defaultValues }: permissionsFieldsProps = {}): Field[] => {
  return [
    {
      name: 'members',
      type: 'group',
      fields: [
        {
          name: 'read',
          type: 'checkbox',
          defaultValue: defaultValues?.member?.read ?? false,
        },
        {
          name: 'manage',
          type: 'checkbox',
          defaultValue: defaultValues?.member?.manage ?? false,
        },
      ],
    },
  ]
}
