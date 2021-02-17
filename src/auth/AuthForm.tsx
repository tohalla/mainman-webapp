import { Formik, Field } from "formik";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import { authenticationMessages } from "./messages";

import { authenticate } from ".";

import Form from "src/general/Form";
import Input from "src/general/Input";
import { inputLabels } from "src/general/messages";

const AuthForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) =>
      authenticate(values).finally(() => setSubmitting(false))
    }
  >
    <Form
      secondaryAction={
        <Link href="/auth/registration">
          <a>
            <FormattedMessage {...authenticationMessages.newAccount} />
          </a>
        </Link>
      }
      submitLabel={
        <FormattedMessage {...authenticationMessages.authenticate} />
      }
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
        label={<FormattedMessage {...authenticationMessages.passwordLabel} />}
        name="password"
        required
        type="password"
      />
    </Form>
  </Formik>
);

export default AuthForm;
