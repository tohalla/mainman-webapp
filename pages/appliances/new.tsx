import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";

import { Page } from "../_app";

import ApplianceForm from "src/appliances/ApplianceForm";
import { layoutProps } from "src/appliances/layout";
import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisations/OrganisationContext";

const NewAppliancePage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { push } = useRouter();

  if (!activeOrganisation) {
    return null;
  }

  return (
    <ApplianceForm
      onSubmit={() =>
        push({
          pathname: "/appliances",
          query: { organisation: activeOrganisation.id },
        })
      }
      organisation={activeOrganisation}
    />
  );
};

NewAppliancePage.displayName = "NewAppliancePage";
NewAppliancePage.Layout = OrganisationContentLayout;
NewAppliancePage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...titles.newAppliance} />,
};

export default NewAppliancePage;
