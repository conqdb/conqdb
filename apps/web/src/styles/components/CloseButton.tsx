import { CloseButton } from "@mantine/core";
import classes from "./CloseButton.module.css";

export const DefaultCloseButton = CloseButton.extend({
  classNames: {
    root: classes.root,
  },
});
