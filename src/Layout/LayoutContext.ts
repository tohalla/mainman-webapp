import React, { ReactNode } from "react";

import type { LayoutProps } from ".";

export default React.createContext<{
  layoutProps: LayoutProps;
  setTitle: (title?: ReactNode) => void;
}>({ layoutProps: {}, setTitle: () => false });
