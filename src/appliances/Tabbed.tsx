import React, { useContext, ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { pageLinks } from "src/general/messages";
import Tabbed from "src/Layout/Views/Tabbed";
import OrganisationContext from "src/organisations/OrganisationContext";

interface Props {
  children: ReactNode;
}

const TabbedAppliances = ({ children }: Props) => {
  const { activeOrganisation } = useContext(OrganisationContext);
  if (!activeOrganisation) {
    return null;
  }

  return (
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
      {children}
    </Tabbed>
  );
};

export default TabbedAppliances;
