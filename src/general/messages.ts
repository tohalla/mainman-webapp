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

  // Entities
  // title text for entity root page
  entities: "Entities",
  // title text for entity creation page
  newEntity: "Create a new entity",

  // Maintainers
  // title text for maintainer root page
  maintainers: "Maintainers",
  // title text for maintainer creation page
  newMaintainer: "Create a new maintainer",
});

export const pageLinks = defineMessages({
  // Entities
  // link text for navigating to entities root page
  entities: "All entities",
  // link text for navigating to creating a new entity
  newEntity: "Create a new entity",

  // Maintainers
  // link text for navigating to maintainers root page
  maintainers: "All maintainers",
  // link text for navigating to creating a new maintainer
  newMaintainer: "Create a new maintainer",
});
