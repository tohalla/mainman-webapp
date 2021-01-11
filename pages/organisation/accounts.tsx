import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import OrganisationContentLayout from "../../src/Layout/OrganisationContentLayout";
import { Page } from "../_app";

import { layoutProps } from "src/organisation/layout";

const messages = defineMessages({
  // title text for organisation accounts
  title: "Accounts",
});

const OrganisationAccountsPage: Page = () => {
  return <div />;
};

OrganisationAccountsPage.displayName = "OrganisationAccountsPage";
OrganisationAccountsPage.Layout = OrganisationContentLayout;
OrganisationAccountsPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default OrganisationAccountsPage;
