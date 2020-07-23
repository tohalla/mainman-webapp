import { isEmpty } from "ramda";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchAppliances } from "src/appliances";
import ApplianceList from "src/appliances/ApplianceList";
import NoAppliances from "src/appliances/NoAppliances";
import Loadable from "src/general/Loadadble";
import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisations/OrganisationContext";

const AppliancesPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: appliances } = useQuery(
    ["appliances", { organisation: activeOrganisation?.id }],
    fetchAppliances,
    { enabled: activeOrganisation?.id }
  );

  if (!activeOrganisation) {
    return null;
  }

  return (
    <Loadable>
      {isEmpty(appliances) ? (
        <NoAppliances organisation={activeOrganisation} />
      ) : (
        appliances && <ApplianceList appliances={appliances} />
      )}
    </Loadable>
  );
};

AppliancesPage.displayName = "AppliancesPage";
AppliancesPage.Layout = OrganisationContentLayout;
AppliancesPage.layoutProps = {
  title: <FormattedMessage {...titles.appliances} />,
};

export default AppliancesPage;
