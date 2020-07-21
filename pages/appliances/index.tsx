import React from "react";
import { FormattedMessage } from "react-intl";

import { Page } from "pages/_app";
import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";

const AppliancesPage: Page = () => {
  return <div />;
};

AppliancesPage.displayName = "AppliancesPage";
AppliancesPage.Layout = OrganisationContentLayout;
AppliancesPage.layoutProps = {
  title: <FormattedMessage {...titles.appliances} />,
};

export default AppliancesPage;
