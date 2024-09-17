import { AppShell } from '@mantine/core'
import classes from './AppShell.module.css'

export const DefaultAppShell = AppShell.extend({
  classNames: {
    root: classes.root,
    header: classes.header,
  },
})
