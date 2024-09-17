'use client'
import { Box, NumberInput, SimpleGrid, Text } from '@mantine/core'
import React from 'react'
import { useEditProfileFormContext } from '.'

interface LeadershipFieldProps {
  label: string
  description: string
  light: string
  medium: string
  heavy: string
}

export const LeadershipField: React.FC<LeadershipFieldProps> = ({
  label,
  description,
  light,
  medium,
  heavy,
}) => {
  const form = useEditProfileFormContext()

  return (
    <Box>
      <Text size="sm" fw={500} style={{ cursor: 'default' }}>
        {label}
      </Text>
      <Text size="xs" c="dimmed" mb={'xs'} style={{ cursor: 'default' }}>
        {description}
      </Text>
      <SimpleGrid cols={3}>
        <NumberInput
          label={light}
          hideControls
          max={100}
          {...form.getInputProps('lightLeadership')}
          clampBehavior="strict"
        />
        <NumberInput
          label={medium}
          hideControls
          max={100}
          {...form.getInputProps('mediumLeadership')}
          clampBehavior="strict"
        />
        <NumberInput
          label={heavy}
          hideControls
          max={100}
          {...form.getInputProps('heavyLeadership')}
          clampBehavior="strict"
        />
      </SimpleGrid>
    </Box>
  )
}
