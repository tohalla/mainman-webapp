import React from "react";
import { FormattedMessage } from "react-intl";

import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";

const IndexPage = () => {
  return <div />;
};

IndexPage.displayName = "IndexPage";
IndexPage.Layout = OrganisationContentLayout;
IndexPage.layoutProps = {
  title: <FormattedMessage {...titles.overview} />,
  options: {
    organisationSelect: false,
  },
};

export default IndexPage;
