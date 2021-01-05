import React from "react";
import { FormattedMessage } from "react-intl";

import { pageLinks } from "src/general/messages";
import { LayoutProps } from "src/Layout";

export const layoutProps: Partial<LayoutProps> = {
  subPages: [
    {
      children: <FormattedMessage {...pageLinks.maintainers} />,
      href: "/maintainers",
    },
    {
      children: <FormattedMessage {...pageLinks.newMaintainer} />,
      href: "/maintainers/new",
    },
  ],
};
