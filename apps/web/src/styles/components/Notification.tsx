import { Notification } from '@mantine/core'
import classes from './Notification.module.css'

export const DefaultNotification = Notification.extend({
  defaultProps: {
    withBorder: true,
  },
  classNames: {
    root: classes.root,
  },
})
