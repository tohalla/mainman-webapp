import { useRouter } from "next/router";
import React from "react";

import OrganisationForm from "../../src/organisation/OrganisationForm";
import { Page } from "../_app";

import DefaultLayout from "src/Layout";

const NewOrganisationPage: Page = () => {
  const { push } = useRouter();
  return <OrganisationForm onSubmit={() => push("/organisations")} />;
};

NewOrganisationPage.displayName = "NewOrganisationPage";
NewOrganisationPage.Layout = DefaultLayout;

export default NewOrganisationPage;
