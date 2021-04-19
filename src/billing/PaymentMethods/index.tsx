import { Elements } from "@stripe/react-stripe-js";
import { isEmpty } from "ramda";
import React, { useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { BoxProps, Grid, Box } from "theme-ui";

import { fetchPaymentMethods } from "src/billing";
import Card from "src/billing/PaymentMethods/Card";
import Button from "src/general/Button";
import generalMessages from "src/general/messages";
import stripe from "src/stripe";
import CardForm from "src/stripe/CardForm";

interface Props extends BoxProps {}

const messages = defineMessages({
  // text for toggling the card form
  addCard: "Add a new card",
});

const PaymentMethods = (props: Props) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const { data: paymentMethods } = useQuery(
    "paymentMethods",
    fetchPaymentMethods
  );
  return (
    <Box {...props}>
      <Elements stripe={stripe}>
        {paymentMethods && !isEmpty(paymentMethods) && (
          <Grid
            sx={{
              gridTemplateColumns: "repeat(auto-fill, minmax(auto, 192px))",
              columnGap: 4,
              alignSelf: "stretch",
              mb: "default",
            }}
          >
            {Object.values(paymentMethods).map(
              ({ id, card }) => card && <Card key={id} card={card} />
            )}
          </Grid>
        )}
        {showCardForm ? (
          <CardForm
            secondaryAction={
              <Button onClick={() => setShowCardForm(false)} variant="plain">
                <FormattedMessage {...generalMessages.cancel} />
              </Button>
            }
          />
        ) : (
          <Button onClick={() => setShowCardForm(true)}>
            <FormattedMessage {...messages.addCard} />
          </Button>
        )}
      </Elements>
    </Box>
  );
};

export default PaymentMethods;
