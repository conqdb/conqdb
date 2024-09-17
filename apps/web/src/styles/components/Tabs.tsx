import { Tabs } from "@mantine/core";
import classes from "./Tabs.module.css";

export const DefaultTabs = Tabs.extend({
  classNames: {
    root: classes.root,
  },
});
