import { Dropzone } from "@mantine/dropzone";
import classes from "./Dropzone.module.css";

export const DefaultDropzone = Dropzone.extend({
  classNames: {
    root: classes.root,
  },
});
