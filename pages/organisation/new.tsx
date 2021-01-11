import { useRouter } from "next/router";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import OrganisationForm from "../../src/organisation/OrganisationForm";
import { Page } from "../_app";

import { layoutProps } from "src/organisation/layout";

const messages = defineMessages({
  // title text for organisation creation page
  title: "Create a new organisation",
});

const NewOrganisationPage: Page = () => {
  const { push } = useRouter();
  return <OrganisationForm onSubmit={() => push("/organisation")} />;
};

NewOrganisationPage.displayName = "NewOrganisationPage";
NewOrganisationPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default NewOrganisationPage;
