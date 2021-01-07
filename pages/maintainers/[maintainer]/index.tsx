import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import Loadadble from "src/general/Loadadble";
import LayoutContext from "src/Layout/LayoutContext";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { fetchMaintainer } from "src/maintainers";
import Entities from "src/maintainers/entities";
import { layoutProps } from "src/maintainers/layout";
import OrganisationContext from "src/organisation/OrganisationContext";
import { getParam } from "src/util/routing";

const MaintainerPage: Page = () => {
  const { setTitle } = useContext(LayoutContext);
  const { query } = useRouter();
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: maintainer } = useQuery(
    ["maintainers", getParam("maintainer", query)],
    ({ queryKey: [_, id] }) =>
      activeOrganisation && fetchMaintainer(activeOrganisation.id, id),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  useEffect(() => {
    setTitle(maintainer?.id);
  }, [maintainer?.id]);

  if (!maintainer) {
    return null;
  }

  return (
    <Loadadble>
      {maintainer.id}
      <Entities maintainer={maintainer} />
    </Loadadble>
  );
};

MaintainerPage.displayName = "MaintainerPage";
MaintainerPage.Layout = OrganisationContentLayout;
MaintainerPage.layoutProps = {
  ...layoutProps,
  options: { organisationSelect: false },
};

export default MaintainerPage;
