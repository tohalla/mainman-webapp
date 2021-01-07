import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import { Page } from "../_app";

import EntityForm from "src/entities/EntityForm";
import { layoutProps } from "src/entities/layout";
import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";

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
  title: <FormattedMessage {...titles.newEntity} />,
};

export default NewEntityPage;
