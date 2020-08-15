import { defineMessages } from "react-intl";

export default defineMessages({
  // link text for navigating to creation of new appliance
  createAppliace: "creating a new appliance",
  /* text to display when organisation has no appliances and the user has
   rights to create them */
  noAppliances:
    "No appliances created yet for {organisationLink}. Continue with {createLink}.",
  /* text to display when organisation has no appliances and the user does not
   have rights to create them */
  noAppliancesRestricted: "There exists no appliances for {organisationLink}.",
});

export const formMessages = defineMessages({
  // Appliance form: label for the name field
  name: "Name",
  // Appliance form: label for the appliance description field
  description: "Description",
  // Appliance form: submit text for creating a new appliance
  create: "Create appliance",
  // Appliance form: submit text for updating an appliance
  update: "Update appliance",
});
