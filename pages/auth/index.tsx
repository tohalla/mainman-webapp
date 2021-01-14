import React from "react";

import AuthForm from "../../src/auth/AuthForm";
import AuthLayout from "../../src/Layout/AuthLayout";
import { Page } from "../_app";

const AuthPage: Page = () => <AuthForm />;
AuthPage.Layout = AuthLayout;

export default AuthPage;
