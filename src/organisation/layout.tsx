import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { LayoutProps } from "src/Layout";

const messages = defineMessages({
  // link text for navigating to organisation root page
  details: "Details",
  // link text for navigating to creating a new organisation
  newOrganisation: "Create a new organisation",
  // link text for navigating to organisation accounts
  accounts: "Accounts",
  // link text for navigating to organisation preferences
  preferences: "Preferences",
});

export const layoutProps: Partial<LayoutProps> = {
  subPages: [
    {
      children: <FormattedMessage {...messages.details} />,
      href: "/organisation",
    },
    {
      children: <FormattedMessage {...messages.accounts} />,
      href: "/organisation/accounts",
    },
    {
      children: <FormattedMessage {...messages.preferences} />,
      href: "/organisation/preferences",
    },
    {
      children: <FormattedMessage {...messages.newOrganisation} />,
      href: "/organisation/new",
    },
  ],
};
