'use server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { COLLECTION_SLUG } from '@/payload/constants'
import { validateRequest } from '@/lib/lucia'
import { createProfileSchema } from './components/CreateProfileForm/createProfile.schema'
import { zodToFormErrors } from '@/utils/zodToFormErrors'
import { getTranslations } from 'next-intl/server'
import { editProfileSchema } from './components/EditProfileForm/editProfile.schema'
import {
  addUserUnitSchema,
  AddUserUnitSchema,
} from './components/UserUnits/AddUserUnit/addUserUnit.schema'
import {
  editUserUnitSchema,
  EditUserUnitSchema,
} from './components/UserUnits/EditUserUnit/editUserUnit.schema'

const slugRefinement = async (data: { slug: string }) => {
  const isUnique = await checkSlugAvailable(data.slug)
  return isUnique
}

interface FormResponse {
  success: boolean
  title: string
  message: string
  data?: any
  errors?: Record<string, string>
}
export const createProfile = async (data: FormData): Promise<FormResponse> => {
  const req = await validateRequest()
  const tResponses = await getTranslations('common.responses')

  if (!req.session) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('mustBeLoggedIn'),
    }
  }

  const formData = Object.fromEntries(data)
  const t = await getTranslations('validation')
  const tProfile = await getTranslations('profile')

  const serverSchema = createProfileSchema(t).refine(slugRefinement, {
    message: tProfile('slug.slugTaken'),
    path: ['slug'],
  })

  const parsed = await serverSchema.safeParseAsync(formData)

  if (!parsed.success) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('fieldsAreInvalid'),
      errors: zodToFormErrors(parsed.error),
    }
  } else {
    try {
      const payload = await getPayloadHMR({ config })

      const result = await payload.update({
        collection: COLLECTION_SLUG.USER,
        id: req.user.id,
        data: parsed.data,
      })

      return {
        success: true,
        title: tResponses('success'),
        message: tProfile('responses.createSuccess'),
        data: result,
      }
    } catch (error) {
      return {
        success: false,
        title: tResponses('error'),
        message: tResponses('somethingWentWrong'),
      }
    }
  }
}

export const checkSlugAvailable = async (slug: string) => {
  const payload = await getPayloadHMR({ config })

  const { totalDocs } = await payload.count({
    collection: COLLECTION_SLUG.USER,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return totalDocs === 0 ? true : false
}

export const updateProfile = async (data: any): Promise<FormResponse> => {
  const req = await validateRequest()
  const tResponses = await getTranslations('common.responses')

  if (!req.session) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('mustBeLoggedIn'),
    }
  }

  const tValidations = await getTranslations('validation')
  const tProfile = await getTranslations('profile')

  const parsed = editProfileSchema(tValidations).safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('fieldsAreInvalid'),
      errors: zodToFormErrors(parsed.error),
    }
  } else {
    try {
      const payload = await getPayloadHMR({ config })

      const result = await payload.update({
        collection: COLLECTION_SLUG.USER,
        id: req.user.id,
        data: parsed.data,
      })
      return {
        success: true,
        title: tResponses('success'),
        message: tProfile('responses.updateSuccess'),
        data: result,
      }
    } catch (error) {
      return {
        success: false,
        title: tResponses('error'),
        message: tResponses('somethingWentWrong'),
      }
    }
  }
}

export const addUserUnitAction = async (data: AddUserUnitSchema): Promise<FormResponse> => {
  const req = await validateRequest()
  const tResponses = await getTranslations('common.responses')

  if (!req.session) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('mustBeLoggedIn'),
    }
  }

  if (req.user.id !== data.user) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('somethingWentWrong'),
    }
  }

  const tValidations = await getTranslations('validation')
  const tProfile = await getTranslations('profile')

  const parsed = addUserUnitSchema(tValidations).safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('fieldsAreInvalid'),
      errors: zodToFormErrors(parsed.error),
    }
  } else {
    try {
      const payload = await getPayloadHMR({ config })

      const result = await payload.create({
        collection: COLLECTION_SLUG.USER_UNIT,
        data: parsed.data,
      })
      return {
        success: true,
        title: tResponses('success'),
        message: tProfile('responses.unitAdded'),
        data: result,
      }
    } catch (error) {
      return {
        success: false,
        title: tResponses('error'),
        message: tResponses('somethingWentWrong'),
      }
    }
  }
}

export const editUserUnitAction = async (
  data: Partial<EditUserUnitSchema>,
): Promise<FormResponse> => {
  const req = await validateRequest()
  const tResponses = await getTranslations('common.responses')

  if (!req.session) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('mustBeLoggedIn'),
    }
  }

  const tValidations = await getTranslations('validation')
  const tProfile = await getTranslations('profile')

  const parsed = editUserUnitSchema(tValidations).safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('fieldsAreInvalid'),
      errors: zodToFormErrors(parsed.error),
    }
  } else {
    try {
      const payload = await getPayloadHMR({ config })

      const result = await payload.update({
        collection: COLLECTION_SLUG.USER_UNIT,
        data: parsed.data,
        where: {
          and: [
            {
              user: {
                equals: req.user.id,
              },
            },
            {
              id: {
                equals: parsed.data.userUnit,
              },
            },
          ],
        },
      })

      return {
        success: true,
        title: tResponses('success'),
        message: tProfile('responses.updateSuccess'),
        data: result,
      }
    } catch (error) {
      return {
        success: false,
        title: tResponses('error'),
        message: tResponses('somethingWentWrong'),
      }
    }
  }
}

export const deleteUserUnitAction = async (userUnitId: string): Promise<FormResponse> => {
  const req = await validateRequest()
  const tResponses = await getTranslations('common.responses')
  const tProfile = await getTranslations('profile.responses')

  if (!req.session) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('mustBeLoggedIn'),
    }
  }

  if (!userUnitId || typeof userUnitId !== 'string') {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('fieldsAreInvalid'),
    }
  }

  try {
    const payload = await getPayloadHMR({ config })

    await payload.delete({
      collection: COLLECTION_SLUG.USER_UNIT,
      where: {
        and: [
          {
            user: {
              equals: req.user.id,
            },
          },
          {
            id: {
              equals: userUnitId,
            },
          },
        ],
      },
    })

    return {
      success: true,
      title: tResponses('success'),
      message: tProfile('unitDeleted'),
    }
  } catch (error) {
    return {
      success: false,
      title: tResponses('error'),
      message: tResponses('somethingWentWrong'),
    }
  }
}
