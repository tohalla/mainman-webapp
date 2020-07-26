import React from "react";

import type { LayoutProps } from ".";

export default React.createContext<{
  layoutProps: LayoutProps;
  setTitle: (title?: string) => void;
}>({ layoutProps: {}, setTitle: () => false });
