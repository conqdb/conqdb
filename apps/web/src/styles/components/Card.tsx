import { Card } from "@mantine/core";
import classes from "./Card.module.css";

export const DefaultCard = Card.extend({
  defaultProps: {
    withBorder: true,
    radius: "md",
  },
  classNames: {
    root: classes.root,
  },
});
