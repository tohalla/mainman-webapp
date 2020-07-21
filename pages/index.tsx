import React from "react";
import { FormattedMessage } from "react-intl";

import { titles } from "src/general/messages";
import DefaultLayout from "src/Layout";

const IndexPage = () => {
  return <div />;
};

IndexPage.displayName = "IndexPage";
IndexPage.Layout = DefaultLayout;
IndexPage.layoutProps = {
  title: <FormattedMessage {...titles.overview} />,
};

export default IndexPage;
