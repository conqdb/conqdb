import { Center, CenterProps, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface NotFoundProps extends CenterProps {
  children?: React.ReactNode
}

export const NotFound: React.FC<NotFoundProps> = ({
  children,
  h = { base: 142, xl: 272 },
  ...props
}) => {
  const t = useTranslations('common.responses')
  return (
    <Center h={h} {...props}>
      <Stack align="center" gap={8}>
        <ThemeIcon variant="default" size="xl" c="dimmed">
          <IconDatabaseOff width="1.4rem" strokeWidth={1.5} />
        </ThemeIcon>
        <Text size="sm" ta="center" fw={500} c="dimmed">
          {children || t('nothingFound')}...
        </Text>
      </Stack>
    </Center>
  )
}
