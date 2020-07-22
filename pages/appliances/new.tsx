import { useRouter } from "next/router";
import React, { useContext } from "react";

import { Page } from "../_app";

import ApplianceForm from "src/appliances/ApplianceForm";
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

export default NewAppliancePage;
