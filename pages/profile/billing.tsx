import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import PaymentMethods from "src/billing/PaymentMethods";
import { layoutProps } from "src/profile/layout";

const messages = defineMessages({
  // title text for Billing
  title: "Billing",
  // text for toggling the card form
  addCard: "Add a new card",
});

const BillingPage = () => {
  return <PaymentMethods />;
};

BillingPage.displayName = "BillingPage";
BillingPage.layoutProps = {
  title: <FormattedMessage {...messages.title} />,
  ...layoutProps,
};

export default BillingPage;
