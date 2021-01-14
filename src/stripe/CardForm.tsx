import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Field, Formik } from "formik";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import Form from "src/general/Form";
import Input from "src/general/Input";

const messages = defineMessages({
  // name in the card label
  name: "Name in the card",
});

const CreateCard = () => {
  const elements = useElements();
  const stripe = useStripe();

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={async (billing_details, { setSubmitting }) => {
        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
          return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details,
        });
      }}
    >
      <Form>
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

CreateCard.displayName = "CreateCard";

export default CreateCard;
