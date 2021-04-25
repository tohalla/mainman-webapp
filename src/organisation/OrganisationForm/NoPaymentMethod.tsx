import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import CardForm from "src/stripe/CardForm";

const messages = defineMessages({
  // message to display if no payment method added when creating an organisation
  addPaymentMethodBefore: "Add payment method before creating an organisation.",
});

// TODO: if eligible for free trial, should display a message that will not be charged
const NoPaymentMethod = () => {
  return (
    <>
      <FormattedMessage {...messages.addPaymentMethodBefore} />
      <CardForm />
    </>
  );
};

export default NoPaymentMethod;
