import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { layoutProps } from "src/profile/layout";

const messages = defineMessages({
  // title text for Billing
  title: "Billing",
});

const BillingPage = () => {
  return <div />;
};

BillingPage.displayName = "BillingPage";
BillingPage.layoutProps = {
  title: <FormattedMessage {...messages.title} />,
  ...layoutProps,
};

export default BillingPage;
