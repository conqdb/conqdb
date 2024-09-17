'use client'
import React, { useState } from 'react'
import { createFormContext } from '@mantine/form'
import { Box, LoadingOverlay, Stack } from '@mantine/core'
import { createProfileSchema } from './createProfile.schema'
import { createProfile } from '../../actions'
import { zodResolver } from '@/utils/zodResolver'
import { CreateProfileSchema } from './createProfile.schema'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/navigation'
import { showSuccessNotification } from '@/modules/common/utils/showSuccessNotification'
import { showErrorNotification } from '@/modules/common/utils/showErrorNotification'

export const [CreateProfileFormProvider, useCreateProfileFormContext, useCreateProfileForm] =
  createFormContext<CreateProfileSchema>()

export const CreateProfileForm = ({
  children,
  invalidSlug,
}: {
  children: React.ReactNode
  invalidSlug: string
}) => {
  const [isPending, setIsPending] = useState(false)
  const [invalidSlugs, setInvalidSlugs] = useState<string[]>([])
  const t = useTranslations('validation')
  const router = useRouter()

  const form = useCreateProfileForm({
    mode: 'controlled',
    initialValues: {
      username: '',
      slug: '',
    },
    validate: zodResolver(createProfileSchema(t)),
  })

  const handleSubmit = async (values: CreateProfileSchema) => {
    if (invalidSlugs.includes(values.slug)) {
      form.setErrors({ slug: invalidSlug })
      return
    }

    setIsPending(true)

    const formData = new FormData()
    formData.append('username', values.username)
    formData.append('slug', values.slug)

    const result = await createProfile(formData)

    if (result.success) {
      showSuccessNotification({ title: result?.title, message: result?.message })
      router.push(`/profile/${result.data?.slug}`)
    } else if (result?.errors) {
      if (result.errors?.slug) {
        setInvalidSlugs((prev) => [...prev, values.slug])
      }
      form.setErrors(result.errors)
      showErrorNotification({ title: result?.title, message: result?.message })
      setIsPending(false)
    }
  }

  return (
    <CreateProfileFormProvider form={form}>
      <Box component="form" onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        {isPending && <LoadingOverlay visible={isPending} />}
        <Stack>{children}</Stack>
      </Box>
    </CreateProfileFormProvider>
  )
}
