import { path } from "ramda";

type ColorAccent = "dark" | "light" | "neutral";

const colors = {
  greyscale: [
    "#000000",
    "#212121",
    "#606060",
    "#929292",
    "#aaaaaa",
    "#bbbbbb",
    "#dfdfdf",
    "#ededed",
    "#f5f5f5",
    "#ffffff",
  ],

  primary: {
    dark: "#18305b",
    light: "#5b739f",
    neutral: "#4f6690",
  },
};

export type Colors = typeof colors;

export const getColor = <T extends keyof Colors>(
  p: [T, ColorAccent | number] | T
) =>
  (Array.isArray(p)
    ? path(["theme", "colors", ...p])
    : path(["theme", "colors", p])) ?? (() => "black");

export default colors;
