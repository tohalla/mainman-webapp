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

  accent: {
    dark: "#d05e00",
    light: "#ff831d",
    __default: "#ff7400",
  },
  primary: {
    __default: "#415C76",
    dark: "#34495e",
    light: "#577C9E",
  },
  text: greyscale[0],
  textInvert: greyscale[greyscale.length - 2],

  indicator: {
    warning: "#ff831d",
    disabled: "#a9a9a9",
    error: "#cc3300",
    success: "#208844",
  },

  neutral: greyscale[4],
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
