import React, { useContext, ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import { pageLinks } from "src/general/messages";
import Tabbed from "src/Layout/Views/Tabbed";
import OrganisationContext from "src/organisations/OrganisationContext";

interface Props {
  children: ReactNode;
}

export default ({ children }: Props) => {
  const { activeOrganisation } = useContext(OrganisationContext);
  if (!activeOrganisation) {
    return null;
  }

  return (
    <Tabbed
      initialTabs={[
        {
          children: <FormattedMessage {...pageLinks.maintainers} />,
          as: "/maintainers",
          href: {
            pathname: "/maintainers",
            query: { organisation: activeOrganisation.id },
          },
        },
        {
          children: <FormattedMessage {...pageLinks.newMaintainer} />,
          as: "/maintainers/new",
          href: {
            pathname: "/maintainers/new",
            query: { organisation: activeOrganisation.id },
          },
        },
      ]}
    >
      {children}
    </Tabbed>
  );
};
