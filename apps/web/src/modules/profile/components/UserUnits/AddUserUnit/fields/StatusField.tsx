'use client'
import { Box, Group, Select, Text, Tooltip } from '@mantine/core'
import React, { useMemo } from 'react'
import { useAddUserUnitFormContext } from '../AddUserUnitProvider'
import { Icon } from '@/modules/common/components/Icon'
import { IconInfoCircle } from '@tabler/icons-react'

interface StatusFieldProps {
  label: string
  status: {
    training: {
      label: string
      description: string
    }
    ready: {
      label: string
      description: string
    }
    maxed: {
      label: string
      description: string
    }
  }
}

export const StatusField: React.FC<StatusFieldProps> = ({ label, status }) => {
  const form = useAddUserUnitFormContext()

  const data = useMemo(() => {
    return [
      { label: status.training.label, value: 'training' },
      { label: status.ready.label, value: 'ready' },
      { label: status.maxed.label, value: 'maxed' },
    ]
  }, [status])
  return (
    <Select
      label={
        <Group gap={8}>
          <Text size="sm">{label}</Text>
          <Tooltip
            maw={372}
            multiline
            zIndex={400}
            label={
              <Box>
                <Text size="xs" fw={600}>
                  {status.training.label}
                </Text>
                <Text size="xs" c="dimmed" fw={400}>
                  {status.training.description}
                </Text>
                <Text size="xs" fw={600} mt={8}>
                  {status.ready.label}
                </Text>
                <Text size="xs" c="dimmed" fw={400}>
                  {status.ready.description}
                </Text>
                <Text size="xs" fw={600} mt={8}>
                  {status.maxed.label}
                </Text>
                <Text size="xs" c="dimmed" fw={400}>
                  {status.maxed.description}
                </Text>
              </Box>
            }
          >
            <Icon icon={IconInfoCircle} size="1rem" />
          </Tooltip>
        </Group>
      }
      data={data}
      {...form.getInputProps('status')}
    />
  )
}
