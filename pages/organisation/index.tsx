import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import OrganisationContentLayout from "../../src/Layout/OrganisationContentLayout";
import { Page } from "../_app";

import { titles } from "src/general/messages";
import useTitle from "src/hooks/useTitle";
import { layoutProps } from "src/organisation/layout";
import OrganisationContext from "src/organisation/OrganisationContext";

const OrganisationDetailsPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);

  useTitle(activeOrganisation?.name);

  return <div />;
};

OrganisationDetailsPage.displayName = "OrganisationsPage";
OrganisationDetailsPage.Layout = OrganisationContentLayout;
OrganisationDetailsPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...titles.organisation} />,
};

export default OrganisationDetailsPage;
