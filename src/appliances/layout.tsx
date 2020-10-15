import React from "react";
import { FormattedMessage } from "react-intl";

import { pageLinks } from "src/general/messages";
import { LayoutProps } from "src/Layout";

export const layoutProps: Partial<LayoutProps> = {
  subPages: [
    {
      children: <FormattedMessage {...pageLinks.appliances} />,
      as: "/appliances",
      href: {
        pathname: "/appliances",
      },
    },
    {
      children: <FormattedMessage {...pageLinks.newAppliance} />,
      as: "/appliances/new",
      href: {
        pathname: "/appliances/new",
      },
    },
  ],
};
