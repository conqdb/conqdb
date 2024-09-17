import { Input } from "@mantine/core";
import classes from "./Input.module.css";

export const DefaultInput = Input.extend({
  classNames: {
    input: classes.input,
  },
});
