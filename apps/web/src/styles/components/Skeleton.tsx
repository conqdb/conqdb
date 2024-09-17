import { Skeleton } from "@mantine/core";
import classes from "./Skeleton.module.css";

export const DefaultSkeleton = Skeleton.extend({
  classNames: {
    root: classes.root,
  },
});
