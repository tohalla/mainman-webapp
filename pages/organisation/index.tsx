import React from "react";
import { FormattedMessage } from "react-intl";

import OrganisationContentLayout from "../../src/Layout/OrganisationContentLayout";
import { Page } from "../_app";

import { titles } from "src/general/messages";

const OrganisationsPage: Page = () => {
  return <div />;
};

OrganisationsPage.displayName = "OrganisationsPage";
OrganisationsPage.Layout = OrganisationContentLayout;
OrganisationsPage.layoutProps = {
  title: <FormattedMessage {...titles.organisation} />,
};

export default OrganisationsPage;
