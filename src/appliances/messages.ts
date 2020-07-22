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
