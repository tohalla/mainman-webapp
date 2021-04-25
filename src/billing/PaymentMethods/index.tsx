import { Elements } from "@stripe/react-stripe-js";
import { Formik } from "formik";
import { prop } from "ramda";
import React, { useState } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Flex, FlexProps } from "theme-ui";

import {
  CardPaymentMethod,
  fetchCustomerDetails,
  updateCustomerDetails,
  fetchPaymentMethods,
  paymentMethodsKey,
  stripeCustomerKey,
} from "src/billing";
import Card from "src/billing/PaymentMethods/Card";
import Button from "src/general/Button";
import CardOptions from "src/general/CardOptions";
import Form from "src/general/Form";
import generalMessages from "src/general/messages";
import stripe from "src/stripe";
import CardForm from "src/stripe/CardForm";

interface Props extends FlexProps {}

const messages = defineMessages({
  // text for toggling the card form
  addCard: "Add a new card",
});

const PaymentMethods = ({ sx, ...props }: Props) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const { data: paymentMethods } = useQuery(
    paymentMethodsKey,
    fetchPaymentMethods
  );
  const { data: stripeCustomer } = useQuery(
    stripeCustomerKey,
    fetchCustomerDetails
  );
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateCustomerDetails, {
    onSuccess: () => queryClient.invalidateQueries(stripeCustomerKey),
  });

  const cards =
    paymentMethods &&
    Object.values(paymentMethods).filter(
      (paymentMethod): paymentMethod is CardPaymentMethod =>
        typeof paymentMethod.card !== "undefined"
    );
  const defaultPaymentMethod = cards?.find(
    ({ id }) => id === stripeCustomer?.invoiceSettings.defaultPaymentMethod
  );

  return (
    <Flex
      {...props}
      sx={{ flexDirection: "column", alignSelf: "stretch", ...sx }}
    >
      {cards?.length && (
        <Formik
          initialValues={{ defaultPaymentMethod }}
          onSubmit={(values) => {
            if (
              values.defaultPaymentMethod?.id &&
              defaultPaymentMethod?.id !== values.defaultPaymentMethod.id
            ) {
              mutate({
                invoiceSettings: {
                  defaultPaymentMethod: values.defaultPaymentMethod.id,
                },
              });
            }
          }}
        >
          {(form) => (
            <Form displayActions={false} sx={{ width: 9 }} {...form}>
              <CardOptions
                Card={(cardProps) => (
                  <Card
                    {...cardProps}
                    defaultPaymentMethod={defaultPaymentMethod}
                    sx={{
                      "&:hover": { boxShadow: "2", transform: "scale(1.1)" },
                    }}
                  />
                )}
                getOptionIdentifier={prop("id")}
                name="defaultPaymentMethod"
                onChange={() => form.submitForm()}
                options={cards}
                sx={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(auto, 192px))",
                  columnGap: 4,
                  alignSelf: "stretch",
                  mb: 5,
                }}
              />
            </Form>
          )}
        </Formik>
      )}
      {showCardForm ? (
        <Elements stripe={stripe}>
          <CardForm
            onPaymentMethodCreated={() => setShowCardForm(false)}
            secondaryAction={
              <Button onClick={() => setShowCardForm(false)} variant="plain">
                <FormattedMessage {...generalMessages.cancel} />
              </Button>
            }
            submitLabel={<FormattedMessage {...messages.addCard} />}
          />
        </Elements>
      ) : (
        <Button onClick={() => setShowCardForm(true)} variant="plain">
          <FormattedMessage {...messages.addCard} />
        </Button>
      )}
    </Flex>
  );
};

export default PaymentMethods;
