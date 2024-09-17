'use client'
import React from 'react'
import { useCreateProfileFormContext } from '.'
import { Box, Text, TextInput } from '@mantine/core'
import { Icon } from '@/modules/common/components/Icon'
import { IconLink } from '@tabler/icons-react'

export const Slug = ({
  label,
  placeholder,
  description,
  preview,
}: {
  label: string
  placeholder: string
  description: string
  preview: string
}) => {
  const form = useCreateProfileFormContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let slug = e.target.value
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9-]/g, '') // Remove invalid characters (only allow letters, numbers, and hyphens)
      .replace(/-{2,}/g, '-') // Ensure no more than one hyphen in a row
      .substring(0, 18) // Limit to 18 characters

    form.setFieldValue('slug', slug)
  }

  return (
    <Box>
      <TextInput
        label={label}
        placeholder={placeholder}
        description={description}
        leftSection={<Icon icon={IconLink} strokeWidth={1.7} size="1rem" />}
        {...form.getInputProps('slug')}
        onChange={(e) => handleChange(e)}
      />
      <Text c="dimmed" size="xs" mt={4}>
        {preview}: https://conqdb.com/profile
        {form.values.slug ? `/${form.values.slug}` : `/lancelot`}
      </Text>
    </Box>
  )
}
