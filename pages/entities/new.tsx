import { useRouter } from "next/router";
import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { Page } from "../_app";

import EntityForm from "src/entities/EntityForm";
import { layoutProps } from "src/entities/layout";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";

const messages = defineMessages({
  // title text for entity creation page
  title: "Create a new entity",
});

const NewEntityPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { push } = useRouter();

  if (!activeOrganisation) {
    return null;
  }

  return (
    <EntityForm
      onSubmit={() =>
        push({
          pathname: "/entities",
          query: { organisation: activeOrganisation.id },
        })
      }
      organisation={activeOrganisation}
    />
  );
};

NewEntityPage.displayName = "NewEntityPage";
NewEntityPage.Layout = OrganisationContentLayout;
NewEntityPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default NewEntityPage;
