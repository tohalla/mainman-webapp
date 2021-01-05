import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchEntity } from "src/entities";
import { layoutProps } from "src/entities/layout";
import Loadadble from "src/general/Loadadble";
import LayoutContext from "src/Layout/LayoutContext";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisations/OrganisationContext";
import { getParam } from "src/util/routing";

const EntityPage: Page = () => {
  const { setTitle } = useContext(LayoutContext);
  const { query } = useRouter();
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data } = useQuery(
    [
      "entities",
      {
        hash: getParam("entity", query),
        organisation: activeOrganisation?.id,
      },
    ],
    ({ queryKey: [_, { organisation, hash }] }) =>
      fetchEntity(organisation, hash),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  useEffect(() => {
    setTitle(data?.name);
  }, [data?.name]);

  return <Loadadble>{data?.name}</Loadadble>;
};

EntityPage.displayName = "EntityPage";
EntityPage.Layout = OrganisationContentLayout;
EntityPage.layoutProps = {
  ...layoutProps,
  options: { organisationSelect: false },
};

export default EntityPage;
