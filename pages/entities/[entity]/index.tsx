import Link from "next/link";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Flex } from "theme-ui";

import { Page } from "pages/_app";
import { entityKey, fetchEntity } from "src/entities";
import { layoutProps } from "src/entities/layout";
import Maintainers from "src/entities/maintainers";
import messages from "src/entities/messages";
import Loadadble from "src/general/Loadadble";
import useParam from "src/hooks/useParam";
import useTitle from "src/hooks/useTitle";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";

const EntityPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: entity } = useQuery(
    entityKey(useParam("entity")),
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
      <Flex mt="default">
        <Link href={`/entities/${entity.hash}/edit`}>
          <a>
            <FormattedMessage {...messages.editEntity} />
          </a>
        </Link>
      </Flex>
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
