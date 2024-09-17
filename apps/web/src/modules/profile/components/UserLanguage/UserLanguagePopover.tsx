'use client'
import { User } from '@/payload-types'
import { ActionIcon, Divider, Popover, Text, UnstyledButton } from '@mantine/core'
import React from 'react'
import { ReactCountryFlag } from 'react-country-flag'

interface UserLanguagePopoverProps {
  nativeLanguage: User['nativeLanguage']
  otherLanguages: User['otherLanguages']
  nativeLabel: string
  otherLabel: string
}
export const UserLanguagePopover: React.FC<UserLanguagePopoverProps> = ({
  nativeLanguage,
  otherLanguages,
  nativeLabel,
  otherLabel,
}) => {
  if (
    typeof nativeLanguage !== 'object' ||
    typeof otherLanguages !== 'object' ||
    !nativeLanguage?.countryCode
  ) {
    return null
  }

  return (
    <Popover position="bottom" withArrow>
      <Popover.Target>
        <ActionIcon variant="default" size={22}>
          <ReactCountryFlag
            countryCode={nativeLanguage?.countryCode}
            aria-label={nativeLanguage?.name!}
            svg
          />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p="xs">
        <Text fz={10} ta="center" fw={500} c="dimmed">
          {nativeLabel}
        </Text>
        <Text size="sm" fw={400} ta="center">
          {nativeLanguage?.name}
        </Text>
        {otherLanguages && otherLanguages?.length > 0 && (
          <>
            <Text fz={10} ta="center" fw={500} mt={7} c="dimmed">
              {otherLabel}
            </Text>
            {otherLanguages.map((language) => {
              if (typeof language !== 'object') {
                return null
              }
              return (
                <Text key={language?.id} size="sm" fw={400} ta="center">
                  {language?.name}
                </Text>
              )
            })}
          </>
        )}
      </Popover.Dropdown>
    </Popover>
  )
}
