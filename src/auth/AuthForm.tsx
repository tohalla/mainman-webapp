import { Formik, Field } from "formik";
import React from "react";
import { Link } from "rebass";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { authenticate } from ".";

const AuthForm = () => (
  <Formik initialValues={{ email: "", password: "" }} onSubmit={authenticate}>
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
