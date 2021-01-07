import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import { Page } from "../_app";

import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { layoutProps } from "src/maintainers/layout";
import MaintainerForm from "src/maintainers/MaintainerForm";
import OrganisationContext from "src/organisation/OrganisationContext";

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
  title: <FormattedMessage {...titles.newMaintainer} />,
};

export default NewMaintainerPage;
