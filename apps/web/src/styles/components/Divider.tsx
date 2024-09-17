import { Divider } from "@mantine/core";
import classes from "./Divider.module.css";

export const DefaultDivider = Divider.extend({
  classNames: {
    root: classes.root,
  },
});
