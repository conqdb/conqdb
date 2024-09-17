import { Popover } from '@mantine/core'
import classes from './Popover.module.css'

export const DefaultPopover = Popover.extend({
  classNames: {
    dropdown: classes.dropdown,
  },
})
