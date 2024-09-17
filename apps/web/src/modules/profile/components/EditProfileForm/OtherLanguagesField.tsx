'use client'
import { Language } from '@/payload-types'
import React, { useMemo } from 'react'
import { useEditProfileFormContext } from '.'
import { ComboboxItem, Group, MultiSelect, OptionsFilter, SelectProps, Text } from '@mantine/core'
import { getLanguageById } from '../../utils/getLanguageById'
import ReactCountryFlag from 'react-country-flag'

export const OtherLanguagesField = ({
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
          disabled: form.getValues().nativeLanguage === language.id,
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
    <MultiSelect
      label={label}
      placeholder={placeholder}
      data={languageData}
      filter={optionsFilter}
      clearable
      searchable
      renderOption={renderSelectOption}
      selectFirstOptionOnChange
      {...form.getInputProps('otherLanguages')}
      nothingFoundMessage={notFound}
      hidePickedOptions
    />
  )
}
