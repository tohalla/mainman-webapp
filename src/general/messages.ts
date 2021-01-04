import { defineMessages } from "react-intl";

export default defineMessages({
  // default text for return
  return: "Return",
  // default text for submit
  submit: "Submit",
  // default text for cancel
  cancel: "Cancel",
});

export const titles = defineMessages({
  // title text for overview
  overview: "Overview",
  // title text for organisation root page
  organisations: "Organisations",
  // title text for organisation creation page
  newOrganisation: "Create a new organisation",
  // title text for profile
  profile: "Profile",

  // Appliances
  // title text for appliance root page
  appliances: "Appliances",
  // title text for appliance creation page
  newAppliance: "Create a new appliance",

  // Maintainers
  // title text for maintainer root page
  maintainers: "Maintainers",
  // title text for maintainer creation page
  newMaintainer: "Create a new maintainer",
});

export const pageLinks = defineMessages({
  // Appliances
  // link text for navigating to appliances root page
  appliances: "All appliances",
  // link text for navigating to creating a new appliance
  newAppliance: "Create a new appliance",

  // Maintainers
  // link text for navigating to maintainers root page
  maintainers: "All maintainers",
  // link text for navigating to creating a new maintainer
  newMaintainer: "Create a new maintainer",
});
