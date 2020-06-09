import { Formik, Field } from "formik";
import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { authenticationMessages } from "./messages";

import { authenticate } from ".";

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
    >
      <Field
        as={Input}
        label={<FormattedMessage {...authenticationMessages.emailLabel} />}
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
