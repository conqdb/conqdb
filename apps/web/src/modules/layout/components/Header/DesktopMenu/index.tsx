import {
  Root,
  Trigger,
  Item,
  Content,
  Link,
  Indicator,
  Viewport,
} from '@radix-ui/react-navigation-menu'
import classes from './index.module.css'
import { NavigationMenuList } from './NavigationMenuList'
import { ChildItem, HeaderMenuItem, headerMenu } from '../menuData'
import { NavigationMenuLink } from './NavigationMenuLink'
import { Card, Divider, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import clsx from 'clsx'
import { MenuItemChildCard } from './MenuItemChildCard'
import { useTranslations } from 'next-intl'

const MenuItemChild = ({ item }: { item: ChildItem }) => {
  const t = useTranslations('navigation')
  const label = t(item.labelKey as any)
  const description = t(item.descriptionKey as any)

  return <MenuItemChildCard item={item} label={label} description={description} />
}

const RootMenuItem = ({ item }: { item: HeaderMenuItem }) => {
  const t = useTranslations('navigation')
  const linkLabel = t(item.labelKey as any)

  const BaseElement = item?.url ? (
    <NavigationMenuLink url={item.url}>{linkLabel}</NavigationMenuLink>
  ) : (
    <Trigger asChild>
      <UnstyledButton className={clsx(classes.trigger, 'mantine-focus-auto')}>
        {linkLabel}
      </UnstyledButton>
    </Trigger>
  )

  return (
    <Item>
      {BaseElement}
      {item?.children ? (
        <Content asChild>
          <Card className={classes.content} p={0}>
            <Text p="sm" size="sm" fw={500}>
              {linkLabel}
            </Text>
            <Divider mx="sm" />
            <SimpleGrid cols={2} spacing={2} px="sm" py="sm">
              {item.children.map((child) => (
                <Link asChild key={child.labelKey}>
                  <MenuItemChild item={child} />
                </Link>
              ))}
            </SimpleGrid>
          </Card>
        </Content>
      ) : undefined}
    </Item>
  )
}

export const DesktopMenu = () => {
  return (
    <Root className={classes.root}>
      <NavigationMenuList>
        {headerMenu.map((item) => {
          return <RootMenuItem key={item.labelKey} item={item} />
        })}
        <Indicator className={classes.indicator}>
          <div className={classes.arrow} />
        </Indicator>
      </NavigationMenuList>
      <div className={classes.viewportPosition}>
        <Viewport className={classes.viewport} />
      </div>
    </Root>
  )
}
