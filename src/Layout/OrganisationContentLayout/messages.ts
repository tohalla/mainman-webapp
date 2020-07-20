import { defineMessages } from "react-intl";

export default defineMessages({
  /* text that the user without organisations is faced with when accessing an
   * feature which requires existing organisations */
  noOrganisations:
    "It seems that you do not have any organisations set up. Before continuing, please {link}.",
  // link text for creating a new organisation for noOrganisations
  noOrganisationsCreateNew: "continue with creating a new organisation",
});
