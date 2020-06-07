import React from "react";

import RegistrationForm from "../../src/auth/RegistrationForm";
import AuthLayout from "../../src/Layout/AuthLayout";
import { Page } from "../_app";

const RegistrationPage: Page = () => (
  <>
    <RegistrationForm />
  </>
);

RegistrationPage.Layout = AuthLayout;

export default RegistrationPage;
