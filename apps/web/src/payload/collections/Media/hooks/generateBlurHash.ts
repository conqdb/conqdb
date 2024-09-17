import { CollectionBeforeChangeHook, APIError } from 'payload'
import { getPlaiceholder } from 'plaiceholder'

export const generateBlurHash: CollectionBeforeChangeHook = async ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    try {
      // const base64String = req?.payloadUploadSizes?.blur.toString('base64')
      // const blurHash = `data:image/png};base64,${base64String}`

      // return {
      //   ...data,
      //   blurHash,
      // }

      const buffer = req?.payloadUploadSizes?.blur

      if (buffer) {
        const { base64 } = await getPlaiceholder(buffer, { size: 32 })

        return {
          ...data,
          blurHash: base64,
        }
      }
    } catch (error) {
      throw new APIError('Failed to generate blur data url')
    }
  }
}
