import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

import OrganisationForm from "../../src/organisations/OrganisationForm";
import { Page } from "../_app";

import { titles } from "src/general/messages";

const NewOrganisationPage: Page = () => {
  const { push } = useRouter();
  return <OrganisationForm onSubmit={() => push("/organisations")} />;
};

NewOrganisationPage.displayName = "NewOrganisationPage";
NewOrganisationPage.layoutProps = {
  title: <FormattedMessage {...titles.newOrganisation} />,
};

export default NewOrganisationPage;
