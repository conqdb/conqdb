'use client'
import React from 'react'
import { useEditProfileFormContext } from '.'
import { handleUsernameOnChange } from '../../utils/handleUsernameOnChange'
import { IconAt } from '@tabler/icons-react'
import { Icon } from '@/modules/common/components/Icon'
import { TextInput } from '@mantine/core'

export const UsernameField = ({
  label,
  placeholder,
  description,
}: {
  label: string
  placeholder: string
  description: string
}) => {
  const form = useEditProfileFormContext()

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      description={description}
      {...form.getInputProps('username')}
      leftSection={<Icon icon={IconAt} strokeWidth={1.7} size="1rem" />}
      onChange={(e) => handleUsernameOnChange(e, form)}
    />
  )
}
