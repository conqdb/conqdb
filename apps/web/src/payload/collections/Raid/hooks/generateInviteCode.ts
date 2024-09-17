import { FieldHook } from 'payload'
import { customAlphabet } from 'nanoid'

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const generateInviteCode: FieldHook = ({ value }) => {
  if (!value) {
    const nanoId = customAlphabet(alphabet, 8)
    let giftCode = nanoId()

    return giftCode
  }
}
