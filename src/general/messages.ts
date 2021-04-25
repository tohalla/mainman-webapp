import { defineMessages, MessageDescriptor } from "react-intl";

export default defineMessages({
  // default text for return
  return: "Return",
  // default text for submit
  submit: "Submit",
  // default text for cancel
  cancel: "Cancel",
  // default text for delete
  delete: "Delete",
  // default text when no entries available
  noEntries: "No entries available",
});

export const inputLabels = defineMessages({
  // text for email input label
  email: "Email address",
});

export const errorMessages: Record<string, MessageDescriptor> = defineMessages({
  // error when account already in organisation
  account_in_organisation: "Account already exists in the organisation",
  // error for invalid email addres
  invalid_email: "Invalid email address",
});
