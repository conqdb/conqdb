import React from 'react'
import { Box, Divider, Group, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import classes from './index.module.css'
import { HeaderMenuItem, headerMenu } from '@/modules/layout/components/Header/menuData'
import { Drawer } from './Drawer'
import { useTranslations } from 'next-intl'
import { Collapse } from './Collapse'
import { ChildLink } from './ChildLink'
import { DrawerBody } from './DrawerBody'
import { LinkWithChildren } from './LinkWithChildren'
import { LinkWithoutChildren } from './LinkWithoutChildren'
import { ChildIcon } from './ChildIcon'
import clsx from 'clsx'
import { LanguageSwitcher } from '../Controls/LanguageSwitcher'
import { ThemeSwitcher } from '../Controls/ThemeSwitcher'

export const MobileMenu = () => {
  const t = useTranslations('navigation')
  return (
    <Drawer>
      <DrawerBody>
        <Stack gap={0}>
          {headerMenu?.map((item) => {
            return (
              <React.Fragment key={item.labelKey}>
                {item?.children ? (
                  <MobileMenuItemWithChildren item={item} />
                ) : (
                  <MobileMenuItem item={item} />
                )}
                <Divider />
              </React.Fragment>
            )
          })}
        </Stack>
      </DrawerBody>
      <Box className={classes.footer}>
        <Group gap={0} w="100%">
          <UnstyledButton className={clsx(classes.actionButton)}>
            <Stack w="100%" align="center" gap={4}>
              <LanguageSwitcher label={t('actions.switchLanguage')} tooltip={false} />
              <Text fz={8} fw={500} c="dimmed">
                {t('actions.switchLanguage')}
              </Text>
            </Stack>
          </UnstyledButton>
          <Divider orientation="vertical" />
          <UnstyledButton className={clsx(classes.actionButton)}>
            <Stack w="100%" align="center" gap={4}>
              <ThemeSwitcher label={t('actions.toggleColorScheme')} tooltip={false} />
              <Text fz={8} fw={500} c="dimmed">
                {t('actions.toggleColorScheme')}
              </Text>
            </Stack>
          </UnstyledButton>
        </Group>
      </Box>
    </Drawer>
  )
}

const MobileMenuItem = ({ item }: { item: HeaderMenuItem }) => {
  const t = useTranslations('navigation')

  return (
    <LinkWithoutChildren href={item.url as string}>{t(item.labelKey as any)}</LinkWithoutChildren>
  )
}

const MobileMenuItemWithChildren = ({ item }: { item: HeaderMenuItem }) => {
  const t = useTranslations('navigation')

  return (
    <Box>
      <LinkWithChildren item={item}>{t(item.labelKey as any)}</LinkWithChildren>
      <Collapse item={item}>
        <Stack gap={2}>
          {item?.children?.map((child) => (
            <ChildLink key={child.labelKey} child={child}>
              <Group align="flex-start" wrap="nowrap">
                <ThemeIcon size={34} variant="default" radius="md" className={classes.childIcon}>
                  <ChildIcon icon={child.icon} />
                </ThemeIcon>
                <Box>
                  <Group>
                    <Text size="sm" fw={500} className={classes.childLabel}>
                      {t(child.labelKey as any)}
                    </Text>
                    {child?.comingSoon ? (
                      <Text
                        fz={10}
                        lh={1}
                        tt="uppercase"
                        fw={600}
                        mb={3}
                        className={classes.comingSoon}
                      >
                        Coming Soon
                      </Text>
                    ) : undefined}
                  </Group>

                  <Text size="xs" c="dimmed" className={classes.childDescription}>
                    {t(child.descriptionKey as any)}
                  </Text>
                </Box>
              </Group>
            </ChildLink>
          ))}
        </Stack>
      </Collapse>
    </Box>
  )
}
