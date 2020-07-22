import { path } from "ramda";

import colors from "./colors";

const breakpoints = ["600px", "960px", "1280px", "1920px"];
const fontSizes = ["12px", "14px", "16px", "20px", "24px", "32px", "48px"];
const space = ["0px", "2px", "4px", "8px", "16px", "32px", "64px", "128px"];
const sizes = [
  "8px",
  "16px",
  "32px",
  "64px",
  "128px",
  "192px",
  "256px",
  "384px",
  "512px",
];

const theme = {
  breakpoints,
  fontSizes,
  space,
  sizes,
  radii: {
    default: 0,
  },

  colors,

  variants: {
    subdued: {
      color: colors.greyscale[3],
    },
  },
  shadows: ["0 2px 4px rgba(0, 0, 0, .1)", "0 3px 6px rgba(0, 0, 0, .1)"],

  buttons: {
    primary: {
      color: colors.greyscale[9],
      bg: colors.primary.neutral,
      borderRadius: 0,
      "&:hover": {
        bg: colors.primary.dark,
      },
      ":disabled": {
        bg: colors.greyscale[4],
      },
      display: "inline-flex",
      px: 4,
      py: 3,
    },
    plain: {
      borderRadius: 0,
      color: colors.text.default,
      p: 0,
      bg: "transparent",
      display: "inline-flex",
      textDecoration: "underline",
      "&:hover": {
        color: colors.accent.neutral,
      },
    },
  },
};

export type Theme = typeof theme;

export const getSpace = (index: number) =>
  path<{ theme: Theme }>(["theme", "space", index]);

export default theme;
