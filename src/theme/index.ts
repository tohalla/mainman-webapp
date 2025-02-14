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
  "768px",
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
      p: {
        mt: 0,
      },
      "h1, h2, h3, h4, h5, h6": {
        variant: "text.heading",
      },
    },
  },

  breakpoints,
  fontSizes,
  space,
  sizes,
  radii: {
    default: 0,
    ...["0px", "2px", "4px", "8px"],
  },

  colors,

  text: {
    subdued: {
      color: "greyscale.3",
    },
    heading: {
      fontFamily: "inherit",
    },
  },

  shadows: {
    ...[
      "0 2px 4px rgba(0, 0, 0, .1)",
      "0 3px 6px rgba(0, 0, 0, .1)",
      "0 5px 10px rgba(0, 0, 0, .2)",
    ],
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

  borderWidths: ["1px"],

  links: {},

  badges: {
    tag: {
      backgroundColor: "indicator.success",
      color: "textInvert",
      px: 2,
      py: 1,
      fontSize: 1,
    },
  },

  cards: {
    primary: {
      backgroundColor: "greyscale.9",
      px: 4,
      py: 3,
      boxShadow: 1,
      flexDirection: "column",
    },
  },

  forms: {
    input: {
      flex: 1,
      background: "none",
      border: "none",
      outline: "none",
      "&:invalid": {
        boxShadow: "none",
      },
    },
  },

  buttons: {
    primary: {
      color: "greyscale.9",
      bg: "primary",
      borderRadius: 0,
      "&:hover": {
        bg: "primary.dark",
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
      color: "inherit",
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
