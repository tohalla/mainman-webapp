import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";

const messages = defineMessages({
  // title text for overview
  title: "Overview",
});

const IndexPage = () => {
  return <div />;
};

IndexPage.displayName = "IndexPage";
IndexPage.Layout = OrganisationContentLayout;
IndexPage.layoutProps = {
  title: <FormattedMessage {...messages.title} />,
  options: {
    organisationSelect: false,
  },
};

export default IndexPage;
