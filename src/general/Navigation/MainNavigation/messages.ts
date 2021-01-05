import { defineMessages } from "react-intl";

export default defineMessages({
  // Navigation: navigation item overview (home)
  overview: "Overview",
  // Navigation: navigation item entities
  entities: "Entities",
  // Navigation: navigation item maintainers
  maintainers: "Maintainers",
});

export const accountMenuMessages = defineMessages({
  // Navigation: Greeting the user with a link to profile
  greeting: "Authenticated as {account}",
  // Navigation: Sign out
  signOut: "Sign out",
});
