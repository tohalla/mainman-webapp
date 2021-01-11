import { useRouter } from "next/router";
import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { Page } from "../_app";

import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { layoutProps } from "src/maintainers/layout";
import MaintainerForm from "src/maintainers/MaintainerForm";
import OrganisationContext from "src/organisation/OrganisationContext";

const messages = defineMessages({
  // title text for maintainer creation page
  title: "Create a new maintainer",
});

const NewMaintainerPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { push } = useRouter();

  if (!activeOrganisation) {
    return null;
  }

  return (
    <MaintainerForm
      onSubmit={() =>
        push({
          pathname: "/maintainers",
          query: { organisation: activeOrganisation.id },
        })
      }
      organisation={activeOrganisation}
    />
  );
};

NewMaintainerPage.displayName = "NewMaintainerPage";
NewMaintainerPage.Layout = OrganisationContentLayout;
NewMaintainerPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default NewMaintainerPage;
