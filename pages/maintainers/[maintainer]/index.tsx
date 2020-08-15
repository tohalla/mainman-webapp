import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import Loadadble from "src/general/Loadadble";
import LayoutContext from "src/Layout/LayoutContext";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { fetchMaintainer } from "src/maintainers";
import Tabbed from "src/maintainers/Tabbed";
import { getParam } from "src/util/routing";

const MaintainerPage: Page = () => {
  const { setTitle } = useContext(LayoutContext);
  const { query } = useRouter();
  const { data } = useQuery(
    [
      "maintainers",
      {
        id: getParam("maintainer", query),
      },
    ],
    fetchMaintainer
  );

  useEffect(() => {
    setTitle(String(data?.id));
  }, [data?.id]);

  return (
    <Tabbed>
      <Loadadble>{data?.id}</Loadadble>
    </Tabbed>
  );
};

MaintainerPage.displayName = "MaintainerPage";
MaintainerPage.Layout = OrganisationContentLayout;
MaintainerPage.layoutProps = {
  options: { organisationSelect: false },
};

export default MaintainerPage;
