import { path } from "ramda";

import theme from ".";

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
};

export type Colors = typeof colors;

export const getColor = <T extends keyof Colors>(
  p: [T, keyof Colors[T]] | T
) => {
  if (Array.isArray(p)) {
    return path<typeof theme>(["theme", "colors", ...(p as string[])]);
  }
  return path<typeof theme>(["theme", "colors", p]);
};

export default colors;
