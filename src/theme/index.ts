import { path } from "ramda";
import { Theme } from "theme-ui";

import colors from "./colors";

const breakpoints = ["600px", "960px", "1280px", "1920px"];
const fontSizes = ["12px", "14px", "16px", "20px", "24px", "32px", "48px"];
const space = ["0px", "2px", "4px", "8px", "16px", "32px", "64px", "128px"];
Object.assign(space, { default: space[4] });

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

const theme: Theme = {
  styles: {
    root: {
      backgroundColor: "greyscale.8",
      fontFamily: "Roboto, sans-serif",
      fontStyle: "normal",
      fontWeight: 400,
      height: "100%",
      a: {
        color: "greyscale.2",
        "&:hover": {
          color: "accent",
        },
      },
    },

    h1: {
      fontSize: "1.6rem",
    },
    h2: {
      fontSize: "1.4rem",
    },
    "h4, h5, h6": {
      fontSize: "1.2rem",
    },

    p: {
      mt: 0,
    },
  },

  breakpoints,
  fontSizes,
  space,
  sizes,
  radii: {
    default: 0,
  },

  colors,

  text: {
    subdued: {
      color: "greyscale.3",
    },
  },

  shadows: {
    ...["0 2px 4px rgba(0, 0, 0, .1)", "0 3px 6px rgba(0, 0, 0, .1)"],
    outline: [
      "inset 0 0 1px rgba(0, 0, 0, 1)",
      "inset 0 0 1px rgba(0, 0, 0, .7)",
      "inset 0 0 1px rgba(0, 0, 0, .4)",
    ],
    text: {
      light: [
        "0 0 4px rgba(255, 255, 255, .8)",
        "0 0 4px rgba(255, 255, 255, .6)",
        "0 0 4px rgba(255, 255, 255, .4)",
      ],
    },
  },

  links: {},

  buttons: {
    primary: {
      color: "greyscale.9",
      bg: "primary",
      borderRadius: 0,
      "&:hover": {
        bg: "primaryDark",
      },
      ":disabled": {
        bg: "greyscale.4",
      },
      display: "inline-flex",
      px: 4,
      py: 3,
    },
    plain: {
      borderRadius: 0,
      color: "text",
      p: 0,
      bg: "transparent",
      display: "inline-flex",
      textDecoration: "underline",
      "&:hover": {
        color: "accent",
      },
    },
  },
};

export const getSpace = (index: number) =>
  path<{ theme: typeof theme }>(["theme", "space", index]);

export default theme;
