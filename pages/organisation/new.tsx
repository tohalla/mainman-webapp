import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

import OrganisationForm from "../../src/organisation/OrganisationForm";
import { Page } from "../_app";

import { titles } from "src/general/messages";
import { layoutProps } from "src/organisation/layout";

const NewOrganisationPage: Page = () => {
  const { push } = useRouter();
  return <OrganisationForm onSubmit={() => push("/organisation")} />;
};

NewOrganisationPage.displayName = "NewOrganisationPage";
NewOrganisationPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...titles.newOrganisation} />,
};

export default NewOrganisationPage;
