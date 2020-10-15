import { isEmpty } from "ramda";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import Loadable from "src/general/Loadadble";
import { titles } from "src/general/messages";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { fetchMaintainers } from "src/maintainers";
import { layoutProps } from "src/maintainers/layout";
import MaintainerList from "src/maintainers/MaintainerList";
import NoMaintainers from "src/maintainers/NoMaintainers";
import OrganisationContext from "src/organisations/OrganisationContext";

const MaintainersPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: maintainers } = useQuery(
    ["maintainers", { organisation: activeOrganisation?.id }],
    fetchMaintainers,
    { enabled: activeOrganisation?.id }
  );

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
  title: <FormattedMessage {...titles.maintainers} />,
};

export default MaintainersPage;
