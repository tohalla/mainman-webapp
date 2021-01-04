import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import Loadadble from "src/general/Loadadble";
import LayoutContext from "src/Layout/LayoutContext";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { fetchMaintainer } from "src/maintainers";
import { layoutProps } from "src/maintainers/layout";
import OrganisationContext from "src/organisations/OrganisationContext";
import { getParam } from "src/util/routing";

const MaintainerPage: Page = () => {
  const { setTitle } = useContext(LayoutContext);
  const { query } = useRouter();
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data } = useQuery(
    [
      "maintainers",
      {
        id: getParam("maintainer", query),
        organisation: activeOrganisation?.id,
      },
    ],
    fetchMaintainer,
    { enabled: activeOrganisation }
  );

  useEffect(() => {
    setTitle(String(data?.id));
  }, [data?.id]);

  return <Loadadble>{data?.id}</Loadadble>;
};

MaintainerPage.displayName = "MaintainerPage";
MaintainerPage.Layout = OrganisationContentLayout;
MaintainerPage.layoutProps = {
  ...layoutProps,
  options: { organisationSelect: false },
};

export default MaintainerPage;
