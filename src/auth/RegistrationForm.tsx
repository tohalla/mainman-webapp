import { Formik, Field } from "formik";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { registrationMessages } from "./messages";

import { register } from ".";

const RegistrationForm = () => (
  <Formik
    initialValues={{
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      retypePassword: "",
      locale: "en",
    }}
    onSubmit={(values, { setSubmitting }) =>
      register(values).finally(() => setSubmitting(false))
    }
  >
    <Form
      secondaryAction={
        <Link href="/auth">
          <a>authentication</a>
        </Link>
      }
    >
      <Field
        as={Input}
        label={<FormattedMessage {...registrationMessages.emailLabel} />}
        name="email"
        required
        type="email"
      />
      <Field as={Input} label="first name" name="firstName" required />
      <Field as={Input} label="last name" name="lastName" required />
      <Field
        as={Input}
        label="password"
        name="password"
        required
        type="password"
      />
      <Field
        as={Input}
        label="retype password"
        name="retypePassword"
        required
        type="password"
      />
    </Form>
  </Formik>
);

export default RegistrationForm;
