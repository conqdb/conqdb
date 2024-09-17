import { Overlay } from '@mantine/core'
import classes from './Overlay.module.css'

export const DefaultOverlay = Overlay.extend({
  defaultProps: {
    classNames: {
      root: classes.root,
    },
  },
})
