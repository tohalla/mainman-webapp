import { isEmpty } from "ramda";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchAppliances } from "src/appliances";
import ApplianceList from "src/appliances/ApplianceList";
import NoAppliances from "src/appliances/NoAppliances";
import Loadable from "src/general/Loadadble";
import { titles, pageLinks } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import Tabbed from "src/Layout/Views/Tabbed";
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
        appliances && (
          <Tabbed
            initialTabs={[
              {
                children: <FormattedMessage {...pageLinks.appliances} />,
                as: "/appliances",
                href: {
                  pathname: "/appliances",
                  query: { organisation: activeOrganisation.id },
                },
              },
              {
                children: <FormattedMessage {...pageLinks.newAppliance} />,
                as: "/appliances/new",
                href: {
                  pathname: "/appliances/new",
                  query: { organisation: activeOrganisation.id },
                },
              },
            ]}
          >
            <ApplianceList appliances={appliances} />
          </Tabbed>
        )
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
