import { isEmpty } from "ramda";
import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { Page } from "pages/_app";
import Loadable from "src/general/Loadadble";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { useMaintainers } from "src/maintainers";
import { layoutProps } from "src/maintainers/layout";
import MaintainerList from "src/maintainers/MaintainerList";
import NoMaintainers from "src/maintainers/NoMaintainers";
import OrganisationContext from "src/organisation/OrganisationContext";

const messages = defineMessages({
  // title text for maintainer root page
  title: "Maintainers",
});

const MaintainersPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: maintainers } = useMaintainers(activeOrganisation);

  if (!activeOrganisation) {
    return null;
  }

  return (
    <Loadable>
      {!maintainers || isEmpty(maintainers) ? (
        <NoMaintainers organisation={activeOrganisation} />
      ) : (
        <MaintainerList maintainers={maintainers} />
      )}
    </Loadable>
  );
};

MaintainersPage.displayName = "MaintainersPage";
MaintainersPage.Layout = OrganisationContentLayout;
MaintainersPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default MaintainersPage;
