import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Field, Formik } from "formik";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import { createPaymentMethod } from "src/billing";
import Form, { FormProps } from "src/general/Form";
import Input from "src/general/Input";

const messages = defineMessages({
  // name in the card label
  name: "Name in the card",
});

const CardForm = (props: FormProps) => {
  const queryClient = useQueryClient();
  const elements = useElements();
  const stripe = useStripe();
  const { mutate } = useMutation(createPaymentMethod, {
    onSuccess: () => queryClient.invalidateQueries("paymentMethods"),
  });

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={async (billingDetails, { setSubmitting }) => {
        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
          return;
        }

        const { paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: billingDetails,
        });
        if (!card) {
          return;
        }
        if (paymentMethod) {
          mutate(paymentMethod, { onSuccess: () => setSubmitting(false) });
        }
      }}
    >
      <Form {...props} sx={{ minWidth: 7 }}>
        <Field
          as={Input}
          label={<FormattedMessage {...messages.name} />}
          name="name"
        />
        <CardElement />
      </Form>
    </Formik>
  );
};

CardForm.displayName = "CreateCard";

export default CardForm;
