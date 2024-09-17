import { UseFormReturnType } from '@mantine/form'

export const handleUsernameOnChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  form: UseFormReturnType<any>,
) => {
  let username = e.target.value
    .replace(/\s+/g, '') // Remove all spaces
    .replace(/[^\p{L}\p{N}-]/gu, '') // Remove invalid characters (only allow alphanumeric characters and hyphens)
    .replace(/-{2,}/g, '-') // Ensure no more than one hyphen in a row
    .substring(0, 18) // Limit to 18 characters

  form.setFieldValue('username', username)
}
