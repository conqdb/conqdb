import { User } from '@/payload-types'
import { Box, Card, Flex, Group, Text } from '@mantine/core'
import React from 'react'
import { ProfileBanner } from './ProfileBanner'
import { ProfileAvatar } from './ProfileAvatar'
import { UserLanguage } from '../UserLanguage'
import { DiscordCopyBadge } from '../DiscordCopyBadge'
import { WeaponBadge } from '@/modules/weapons/components/WeaponBadge'

export const UserProfile = ({ user }: { user: User }) => {
  return (
    <Card p={0}>
      <ProfileBanner user={user} />
      <ProfileAvatar url={user?.avatar} />
      <Flex
        direction="column"
        align={{ base: 'center', xs: 'flex-start' }}
        gap={{ base: 'xs' }}
        px={{ base: 'md', xs: 'lg', lg: 'xl' }}
        pb="md"
        pt="sm"
      >
        <Flex
          wrap="wrap"
          align={{ base: 'center' }}
          justify={{ base: 'center', xs: 'flex-start' }}
          gap={{ base: 4, xs: 'sm' }}
        >
          <Group gap={4} wrap="nowrap">
            <Text size="lg" fw={500}>
              {user?.username}
            </Text>
            <UserLanguage
              nativeLanguage={user?.nativeLanguage}
              otherLanguages={user?.otherLanguages}
            />
          </Group>
          <DiscordCopyBadge username={user?.discordUsername} />
        </Flex>
        <Flex
          direction={{ base: 'column', xs: 'row' }}
          align={{ base: 'center', xs: 'flex-start' }}
          justify={{ xs: 'space-between' }}
          gap="xs"
          w="100%"
        >
          <Text
            fw={500}
            size="xs"
            c="dimmed"
            tt="uppercase"
            style={{ wordBreak: 'break-word', whiteSpace: 'nowrap' }}
          >
            Level {user?.level}
          </Text>
          <Flex gap={{ base: 4 }} wrap="wrap" justify={{ base: 'center', xs: 'flex-end' }}>
            {user.weapons?.map((weapon, index) => (
              <WeaponBadge
                key={weapon.id}
                weaponId={(typeof weapon.weapon === 'object' && weapon?.weapon?.id) || ''}
                primary={index === 0 ? true : false}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}
