'use client'
import { TextInput } from '@mantine/core'
import React from 'react'
import { useCreateProfileFormContext } from '.'
import { Icon } from '@/modules/common/components/Icon'
import { IconAt } from '@tabler/icons-react'
import standardSlugify from 'standard-slugify'
import { handleUsernameOnChange } from '../../utils/handleUsernameOnChange'

export const Username = ({
  label,
  placeholder,
  description,
}: {
  label: string
  placeholder: string
  description: string
}) => {
  const form = useCreateProfileFormContext()

  const handleBlur = () => {
    const usernameIsValid = form.isValid('username')

    if (usernameIsValid && !form.getValues().slug) {
      const username = form.getValues().username

      form.setFieldValue('slug', standardSlugify(username))
    }
  }

  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      description={description}
      {...form.getInputProps('username')}
      leftSection={<Icon icon={IconAt} strokeWidth={1.7} size="1rem" />}
      onBlur={handleBlur}
      onChange={(e) => handleUsernameOnChange(e, form)}
    />
  )
}
