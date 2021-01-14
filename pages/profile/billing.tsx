import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { layoutProps } from "src/profile/layout";
import stripe from "src/stripe";
import CreateCard from "src/stripe/CardForm";

const messages = defineMessages({
  // title text for Billing
  title: "Billing",
});

const BillingPage = () => {
  return (
    <Elements stripe={stripe}>
      <CreateCard />
    </Elements>
  );
};

BillingPage.displayName = "BillingPage";
BillingPage.layoutProps = {
  title: <FormattedMessage {...messages.title} />,
  ...layoutProps,
};

export default BillingPage;
