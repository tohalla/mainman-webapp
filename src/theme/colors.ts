import { path } from "ramda";

import type { Theme } from ".";

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
    return path<Theme>(["theme", "colors", ...(p as string[])]);
  }
  return path<{ theme: Theme }>(["theme", "colors", p]);
};

export default colors;
