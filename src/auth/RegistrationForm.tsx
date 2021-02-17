import { Formik, Field } from "formik";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import Form from "../general/Form";
import Input from "../general/Input";

import { registrationMessages } from "./messages";

import { register } from ".";

import { inputLabels } from "src/general/messages";

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
          <a>
            <FormattedMessage {...registrationMessages.authenticate} />
          </a>
        </Link>
      }
      submitLabel={<FormattedMessage {...registrationMessages.register} />}
    >
      <Field
        as={Input}
        label={<FormattedMessage {...inputLabels.email} />}
        name="email"
        required
        type="email"
      />
      <Field
        as={Input}
        label={<FormattedMessage {...registrationMessages.firstNameLabel} />}
        name="firstName"
        required
      />
      <Field
        as={Input}
        label={<FormattedMessage {...registrationMessages.lastNameLabel} />}
        name="lastName"
        required
      />
      <Field
        as={Input}
        label={<FormattedMessage {...registrationMessages.passwordLabel} />}
        name="password"
        required
        type="password"
      />
      <Field
        as={Input}
        label={
          <FormattedMessage {...registrationMessages.retypePasswordLabel} />
        }
        name="retypePassword"
        required
        type="password"
      />
    </Form>
  </Formik>
);

export default RegistrationForm;
