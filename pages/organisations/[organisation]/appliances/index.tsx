import React, { useContext } from "react";

import { Page } from "pages/_app";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";

const AppliancesPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  return <div>{activeOrganisation?.name}</div>;
};

AppliancesPage.displayName = "AppliancesPage";
AppliancesPage.Layout = OrganisationContentLayout;

export default AppliancesPage;
