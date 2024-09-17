import { FieldHook } from 'payload'

export const setLeadershipDoc: FieldHook = ({ value, siblingData }) => {
  if (!value && siblingData.leadership) {
    return (value = Math.round(siblingData?.leadership * 0.84))
  }

  return value
}
