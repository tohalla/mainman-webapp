import React, { useContext } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchEntity } from "src/entities";
import { layoutProps } from "src/entities/layout";
import Maintainers from "src/entities/maintainers";
import Loadadble from "src/general/Loadadble";
import useParam from "src/hooks/useParam";
import useTitle from "src/hooks/useTitle";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";

const EntityPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: entity } = useQuery(
    ["entities", useParam("entity")],
    ({ queryKey: [_, hash] }) =>
      activeOrganisation && fetchEntity(activeOrganisation.id, hash),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  useTitle(entity?.name);

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
