import { MantineTheme, Menu, MenuItem, MenuProps } from "@mantine/core";
import classes from "./Menu.module.css";

export const DefaultMenu = Menu.extend({
  classNames: {
    dropdown: classes.dropdown,
    divider: classes.divider,
    item: classes.item,
    arrow: classes.arrow,
  },

  vars: (theme: MantineTheme, props: MenuProps) => {
    return { root: {} };
  },
});

export const DefaultMenuItem = MenuItem.extend({});
