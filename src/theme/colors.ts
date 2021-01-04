import { path } from "ramda";

const greyscale = [
  "#000000",
  "#212121",
  "#383838",
  "#606060",
  "#929292",
  "#aaaaaa",
  "#bbbbbb",
  "#dfdfdf",
  "#ededed",
  "#ffffff",
];

const colors = {
  greyscale,

  primary: {
    dark: "#18305b",
    light: "#5b739f",
    neutral: "#4f6690",
  },
  accent: {
    dark: "#d05e00",
    light: "#ff831d",
    neutral: "#ff7400",
  },
  indicator: {
    warning: "#ff831d",
    disabled: "#a9a9a9",
    error: "#cc3300",
    success: "#208844",
  },

  text: {
    default: greyscale[0],
    light: greyscale[greyscale.length - 2],
  },
};

export type Colors = typeof colors;

export const getColor = <T extends keyof Colors>(p: [T, keyof Colors[T]] | T) =>
  ((Array.isArray(p)
    ? path(["theme", "colors", ...(p as string[])])
    : path(["theme", "colors", p])) ?? (() => "black")) as () => string;

export default colors;
