import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchAppliance } from "src/appliances";
import { layoutProps } from "src/appliances/layout";
import Loadadble from "src/general/Loadadble";
import LayoutContext from "src/Layout/LayoutContext";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisations/OrganisationContext";
import { getParam } from "src/util/routing";

const AppliancePage: Page = () => {
  const { setTitle } = useContext(LayoutContext);
  const { query } = useRouter();
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data } = useQuery(
    [
      "appliances",
      {
        hash: getParam("appliance", query),
        organisation: activeOrganisation?.id,
      },
    ],
    ({ queryKey: [_, { organisation, appliance }] }) =>
      fetchAppliance(organisation, appliance),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  useEffect(() => {
    setTitle(data?.name);
  }, [data?.name]);

  return <Loadadble>{data?.name}</Loadadble>;
};

AppliancePage.displayName = "AppliancePage";
AppliancePage.Layout = OrganisationContentLayout;
AppliancePage.layoutProps = {
  ...layoutProps,
  options: { organisationSelect: false },
};

export default AppliancePage;
