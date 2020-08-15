import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import { Page } from "../_app";

import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import MaintainerForm from "src/maintainers/MaintainerForm";
import Tabbed from "src/maintainers/Tabbed";
import OrganisationContext from "src/organisations/OrganisationContext";

const NewMaintainerPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { push } = useRouter();

  if (!activeOrganisation) {
    return null;
  }

  return (
    <Tabbed>
      <MaintainerForm
        onSubmit={() =>
          push({
            pathname: "/maintainers",
            query: { organisation: activeOrganisation.id },
          })
        }
        organisation={activeOrganisation}
      />
    </Tabbed>
  );
};

NewMaintainerPage.displayName = "NewMaintainerPage";
NewMaintainerPage.Layout = OrganisationContentLayout;
NewMaintainerPage.layoutProps = {
  title: <FormattedMessage {...titles.newMaintainer} />,
};

export default NewMaintainerPage;
