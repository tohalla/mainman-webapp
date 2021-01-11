import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import OrganisationContentLayout from "../../src/Layout/OrganisationContentLayout";
import { Page } from "../_app";

import { layoutProps } from "src/organisation/layout";

const messages = defineMessages({
  // title text for organisation preferences
  title: "Preferences",
});

const OrganisationPreferencesPage: Page = () => {
  return <div />;
};

OrganisationPreferencesPage.displayName = "OrganisationPreferencesPage";
OrganisationPreferencesPage.Layout = OrganisationContentLayout;
OrganisationPreferencesPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default OrganisationPreferencesPage;
