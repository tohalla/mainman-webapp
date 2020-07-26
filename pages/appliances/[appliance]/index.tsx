import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchAppliance } from "src/appliances";
import Tabbed from "src/appliances/Tabbed";
import Loadadble from "src/general/Loadadble";
import LayoutContext from "src/Layout/LayoutContext";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { getParam } from "src/util/routing";

const AppliancePage: Page = () => {
  const { setTitle } = useContext(LayoutContext);
  const { query } = useRouter();
  const { data } = useQuery(
    [
      "appliances",
      {
        hash: getParam("appliance", query),
      },
    ],
    fetchAppliance
  );

  useEffect(() => {
    setTitle(data?.name);
  }, [data?.name]);

  return (
    <Tabbed>
      <Loadadble>{data?.name}</Loadadble>
    </Tabbed>
  );
};

AppliancePage.displayName = "AppliancePage";
AppliancePage.Layout = OrganisationContentLayout;
AppliancePage.layoutProps = {
  options: { organisationSelect: false },
};

export default AppliancePage;
