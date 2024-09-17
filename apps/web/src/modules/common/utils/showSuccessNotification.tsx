'use client'
import { notifications } from '@mantine/notifications'
import { Icon } from '../components/Icon'
import { IconCheck } from '@tabler/icons-react'

export const showSuccessNotification = ({ title, message }: { title: string; message: string }) => {
  const iconCheck = <Icon icon={IconCheck} size="1rem" />
  notifications.show({
    color: 'green',
    icon: iconCheck,
    title,
    message,
  })
}
