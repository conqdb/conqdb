'use client'

import React from 'react'
import { useEditProfileFormContext } from '.'
import { NumberInput } from '@mantine/core'
import { Icon } from '@/modules/common/components/Icon'
import { IconUserUp } from '@tabler/icons-react'

export const LevelField = ({
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
    <NumberInput
      label={label}
      placeholder={placeholder}
      description={description}
      allowNegative={false}
      max={999999}
      {...form.getInputProps('level')}
      leftSection={<Icon icon={IconUserUp} size="1rem" />}
      hideControls={true}
    />
  )
}
