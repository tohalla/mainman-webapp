import "@emotion/react";

import theme from "src/theme";

type DerivedTheme = typeof theme;

declare module "@emotion/react" {
  export interface Theme extends DerivedTheme {}
}
