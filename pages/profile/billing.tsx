import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import Button from "src/general/Button";
import CardForm from "src/stripe/CardForm";
import PaymentMethods from "src/billing/PaymentMethods";
import PlainButton from "src/general/Button/PlainButton";
import generalMessages from "src/general/messages";
import stripe from "src/stripe";
import { fetchPaymentMethods } from "src/billing";
import { layoutProps } from "src/profile/layout";
import { isEmpty } from "ramda";

const messages = defineMessages({
  // title text for Billing
  title: "Billing",
  // text for toggling the card form
  addCard: "Add a new card",
});

const BillingPage = () => {
  const [showCardForm, setShowCardForm] = useState(false);
  const { data: paymentMethods } = useQuery(
    "paymentMethods",
    fetchPaymentMethods
  );

  return (
    <Elements stripe={stripe}>
      {paymentMethods && !isEmpty(paymentMethods) && (
        <PaymentMethods paymentMethods={paymentMethods} mb="default" />
      )}
      {showCardForm ? (
        <CardForm
          secondaryAction={
            <PlainButton onClick={() => setShowCardForm(false)}>
              <FormattedMessage {...generalMessages.cancel} />
            </PlainButton>
          }
        />
      ) : (
        <Button onClick={() => setShowCardForm(true)}>
          <FormattedMessage {...messages.addCard} />
        </Button>
      )}
    </Elements>
  );
};

BillingPage.displayName = "BillingPage";
BillingPage.layoutProps = {
  title: <FormattedMessage {...messages.title} />,
  ...layoutProps,
};

export default BillingPage;
