'use client'
import { notifications } from '@mantine/notifications'
import { Icon } from '../components/Icon'
import { IconX } from '@tabler/icons-react'

export const showErrorNotification = ({ title, message }: { title: string; message: string }) => {
  const iconX = <Icon icon={IconX} size="1rem" />
  notifications.show({
    color: 'red',
    icon: iconX,
    title,
    message,
  })
}
