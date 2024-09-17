'use client'
import { ComboboxItem, Group, OptionsFilter, Select, SelectProps, Text } from '@mantine/core'
import React, { useMemo } from 'react'

import ReactCountryFlag from 'react-country-flag'
import { useEditProfileFormContext } from '.'
import { getLanguageById } from '@/modules/profile/utils/getLanguageById'
import { Language } from '@/payload-types'

export const NativeLanguageField = ({
  languages,
  label,
  placeholder,
  notFound,
}: {
  languages: Language[]
  label: string
  placeholder: string
  notFound: string
}) => {
  const form = useEditProfileFormContext()

  const languageData = useMemo(() => {
    return (
      languages?.map((language) => {
        return {
          value: language.id,
          label: language?.name || '',
          disabled: form.getValues().otherLanguages?.includes(language.id),
        }
      }) || []
    )
  }, [languages, form])

  const optionsFilter: OptionsFilter = ({ options, search }) => {
    const filtered = (options as ComboboxItem[]).filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim()),
    )

    filtered.sort((a, b) => a.label.localeCompare(b.label))
    return filtered
  }

  const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => {
    const language = getLanguageById(option.value, languages)

    return (
      <Group>
        <ReactCountryFlag countryCode={language?.countryCode ?? ''} svg />
        <Text>{option.label}</Text>
      </Group>
    )
  }

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={languageData}
      filter={optionsFilter}
      allowDeselect={true}
      clearable
      searchable
      renderOption={renderSelectOption}
      selectFirstOptionOnChange
      {...form.getInputProps('nativeLanguage')}
      nothingFoundMessage={notFound}
    />
  )
}
