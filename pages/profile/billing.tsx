import { Elements } from "@stripe/react-stripe-js";
import { isEmpty } from "ramda";
import React, { useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { fetchPaymentMethods } from "src/billing";
import PaymentMethods from "src/billing/PaymentMethods";
import Button from "src/general/Button";
import PlainButton from "src/general/Button/PlainButton";
import generalMessages from "src/general/messages";
import { layoutProps } from "src/profile/layout";
import stripe from "src/stripe";
import CardForm from "src/stripe/CardForm";

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
        <PaymentMethods mb="default" paymentMethods={paymentMethods} />
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
