import React from 'react'
import classes from './index.module.css'
import { Box, Container, Divider, Group, Stack, Text, ThemeIcon, rem } from '@mantine/core'
import { BrandLogo } from '@/modules/common/components/BrandLogo'
import { IconCheck } from '@/modules/common/icons/IconCheck'
import { useTranslations } from 'next-intl'

interface PrefixWithBGProps {
  children?: React.ReactNode
}
export const PrefixWithBG: React.FC<PrefixWithBGProps> = ({ children }) => {
  const t = useTranslations('profile')
  return (
    <Box className={classes.background}>
      <Box component="video" className={classes.video} autoPlay={true} muted loop>
        <source src="/videos/knightfall.mp4" type="video/mp4" />
      </Box>
      <Container size="xs" mt={rem(42)}>
        <Stack align="center" mb="xl">
          <BrandLogo w={{ base: '10rem', md: '12rem' }} />
          <Divider w="100%" />
          <Group>
            <Group gap={8} justify="center">
              <ThemeIcon variant="light" color="blue" size="xs">
                <IconCheck size="md" strokeWidth={2} />
              </ThemeIcon>
              <Text size="xs" tt="uppercase" fw={500} lh={1}>
                {t('raidManager')}
              </Text>
            </Group>
            <Divider orientation="vertical" />
            <Group gap={7} justify="center">
              <ThemeIcon variant="light" color="blue" size="xs">
                <IconCheck size="md" strokeWidth={2} />
              </ThemeIcon>
              <Text size="xs" tt="uppercase" fw={500} lh={1}>
                {t('exclusiveFeatures')}
              </Text>
            </Group>
          </Group>
        </Stack>
      </Container>
      {children}
    </Box>
  )
}
