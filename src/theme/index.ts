import { path } from "ramda";

import colors from "./colors";

const theme = {
  breakpoints: ["600px", "960px", "1280px", "1920px"],
  fontSizes: ["12px", "14px", "16px", "20px", "24px", "32px", "48px"],
  space: ["0px", "2px", "4px", "8px", "16px", "32px", "64px", "128px"],
  radii: {
    default: 0,
  },

  colors,

  buttons: {
    primary: {
      color: colors.greyscale[9],
      bg: colors.primary.neutral,
      borderRadius: 0,
      "&:hover": {
        backgroundColor: colors.primary.dark,
      },
    },
  },
};

export type Theme = typeof theme;

export const getSpace = (index: number) =>
  path<{ theme: Theme }>(["theme", "space", index]);

export default theme;
