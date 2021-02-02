import { path } from "ramda";
import { ColorModesScale } from "theme-ui";

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

const colors: ColorModesScale = {
  greyscale,

  accent: "#ff7400",
  primary: "#415C76",
  primaryDark: "#34495e",
  text: greyscale[0],
  textInvert: greyscale[greyscale.length - 2],

  indicator: {
    warning: "#ff831d",
    disabled: "#a9a9a9",
    error: "#cc3300",
    success: "#208844",
  },

  border: {
    neutral: greyscale[5],
  },
};

export type Colors = typeof colors;

export const getColor = <T extends keyof Colors>(p: [T, keyof Colors[T]] | T) =>
  ((Array.isArray(p)
    ? path(["theme", "colors", ...(p as string[])])
    : path(["theme", "colors", p])) ?? (() => "black")) as () => string;

export default colors;
