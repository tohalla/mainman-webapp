import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { LayoutProps } from "src/Layout";

export const messages = defineMessages({
  // link text for navigating to profile root page
  profile: "Profile",
  // link text for navigating to profile billing page
  billing: "Billing",
});

export const layoutProps: Partial<LayoutProps> = {
  subPages: [
    {
      children: <FormattedMessage {...messages.profile} />,
      href: "/profile",
    },
    {
      children: <FormattedMessage {...messages.billing} />,
      href: "/profile/billing",
    },
  ],
};
