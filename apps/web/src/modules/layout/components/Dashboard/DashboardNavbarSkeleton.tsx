import { AppShellFooter, AppShellNavbar, AspectRatio, Group, Skeleton, Stack } from '@mantine/core'
import React from 'react'

export const DashboardNavbarSkeleton = () => {
  return (
    <>
      <AppShellNavbar visibleFrom="xs" p={7}>
        <Stack gap={7}>
          <AspectRatio ratio={1 / 1} w="100%">
            <Skeleton w="100%" radius="md" />
          </AspectRatio>
          <AspectRatio ratio={1 / 1} w="100%">
            <Skeleton w="100%" />
          </AspectRatio>
          <AspectRatio ratio={1 / 1} w="100%">
            <Skeleton w="100%" />
          </AspectRatio>
        </Stack>
      </AppShellNavbar>
      <AppShellFooter hiddenFrom="xs" p={4}>
        <Group gap={4} w="100%" h="100%" wrap="nowrap">
          <Skeleton flex={1} h="100%" />
          <Skeleton flex={1} h="100%" />
          <Skeleton flex={1} h="100%" />
        </Group>
      </AppShellFooter>
    </>
  )
}
