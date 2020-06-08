import { Formik, Field } from "formik";
import Link from "next/link";
import React from "react";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { authenticate } from ".";

const RegistrationForm = () => (
  <Formik
    initialValues={{
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      retypePassword: "",
    }}
    onSubmit={authenticate}
  >
    <Form
      secondaryAction={
        <Link href="/auth/">
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

export default RegistrationForm;
