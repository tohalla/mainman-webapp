import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { LayoutProps } from "src/Layout";

export const messages = defineMessages({
  // link text for navigating to organisation root page
  details: "Details",
  // link text for navigating to creating a new organisation
  newOrganisation: "Create a new organisation",
});

export const layoutProps: Partial<LayoutProps> = {
  subPages: [
    {
      children: <FormattedMessage {...messages.details} />,
      href: "/organisation",
    },
    {
      children: <FormattedMessage {...messages.newOrganisation} />,
      href: "/organisation/new",
    },
  ],
};
