import React from "react";

import OrganisationForm from "../../src/organisation/OrganisationForm";
import { Page } from "../_app";

const NewOrganisationPage: Page = () => {
  return <OrganisationForm />;
};

NewOrganisationPage.displayName = "NewOrganisationPage";

export default NewOrganisationPage;
