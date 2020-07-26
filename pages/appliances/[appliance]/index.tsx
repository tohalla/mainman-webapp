import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchAppliance } from "src/appliances";
import Tabbed from "src/appliances/Tabbed";
import Loadadble from "src/general/Loadadble";
import DefaultLayout from "src/Layout";
import { getParam } from "src/util/routing";

const AppliancePage: Page = () => {
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

  return (
    <Tabbed>
      <Loadadble>{data?.name}</Loadadble>
    </Tabbed>
  );
};

AppliancePage.displayName = "AppliancePage";
AppliancePage.Layout = DefaultLayout;

export default AppliancePage;
