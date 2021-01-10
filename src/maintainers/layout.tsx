import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { LayoutProps } from "src/Layout";

export const messages = defineMessages({
  // link text for navigating to maintainers root page
  maintainers: "All maintainers",
  // link text for navigating to creating a new maintainer
  newMaintainer: "Create a new maintainer",
});

export const layoutProps: Partial<LayoutProps> = {
  subPages: [
    {
      children: <FormattedMessage {...messages.maintainers} />,
      href: "/maintainers",
    },
    {
      children: <FormattedMessage {...messages.newMaintainer} />,
      href: "/maintainers/new",
    },
  ],
};
