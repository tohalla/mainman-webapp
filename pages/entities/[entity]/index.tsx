import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchEntity } from "src/entities";
import { layoutProps } from "src/entities/layout";
import Maintainers from "src/entities/maintainers";
import Loadadble from "src/general/Loadadble";
import LayoutContext from "src/Layout/LayoutContext";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisations/OrganisationContext";
import { getParam } from "src/util/routing";

const EntityPage: Page = () => {
  const { setTitle } = useContext(LayoutContext);
  const { query } = useRouter();
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: entity } = useQuery(
    ["entities", getParam("entity", query)],
    ({ queryKey: [_, hash] }) =>
      activeOrganisation && fetchEntity(activeOrganisation.id, hash),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  useEffect(() => {
    setTitle(entity?.name);
  }, [entity]);

  if (!entity) {
    return null;
  }

  return (
    <Loadadble>
      {entity.name}
      <Maintainers entity={entity} />
    </Loadadble>
  );
};

EntityPage.displayName = "EntityPage";
EntityPage.Layout = OrganisationContentLayout;
EntityPage.layoutProps = {
  ...layoutProps,
  options: { organisationSelect: false },
};

export default EntityPage;
