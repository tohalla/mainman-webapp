import { Formik, Field } from "formik";
import Link from "next/link";
import React from "react";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { authenticate } from ".";

const AuthForm = () => (
  <Formik
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, actions) =>
      authenticate(values).finally(() => actions.setSubmitting(false))
    }
  >
    <Form
      secondaryAction={
        <Link href="/auth/registration">
          <a>registration</a>
        </Link>
      }
    >
      <Field as={Input} label="email" name="email" required type="email" />
      <Field
        as={Input}
        label="password"
        name="password"
        required
        type="password"
      />
    </Form>
  </Formik>
);

export default AuthForm;
