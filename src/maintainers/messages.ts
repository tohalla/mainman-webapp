import { defineMessages } from "react-intl";

export default defineMessages({
  // link text for navigating to creation of new maintainer
  createAppliace: "creating a new maintainer",
  /* text to display when organisation has no maintainers and the user has
   rights to create them */
  noMaintainers:
    "No maintainers created yet for {organisationLink}. Continue with {createLink}.",
  /* text to display when organisation has no maintainers and the user does not
   have rights to create them */
  noMaintainersRestricted:
    "There exists no maintainers for {organisationLink}.",
});

export const formMessages = defineMessages({
  // Maintainer form: label for the name field
  name: "Name",
  // Maintainer form: label for the maintainer email field
  email: "Email",
  // maintainer form: submit text for creating a new maintainer
  create: "Create maintainer",
  // maintainer form: submit text for updating an maintainer
  update: "Update maintainer",
});
