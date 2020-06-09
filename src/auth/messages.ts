import { defineMessages } from "react-intl";

export const authenticationMessages = defineMessages({
  // Authentication: Label for email address field
  emailLabel: "Email address",
  // Authentication: Label for password field
  passwordLabel: "Password",
  // Authentication: Link text for registering a new account
  newAccount: "Register a new account",
  // Authentication: Submit button
  authenticate: "Authenticate",
});

export const registrationMessages = defineMessages({
  // Registration: Label for email address field
  emailLabel: "Email address",
  // Registration: Label for first name field
  firstNameLabel: "First name",
  // Registration: Label for last name field
  lastNameLabel: "Last name",
  // Registration: Label for password field
  passwordLabel: "Password",
  // Registration: Label for retype password field
  retypePasswordLabel: "Retype password",
  // Registration: Submit button
  register: "Register a new account",
  // Registration: link text for returning to authentication
  authenticate: "I already have an account",
});
