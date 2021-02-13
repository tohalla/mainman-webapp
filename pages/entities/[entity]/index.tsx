import Link from "next/link";
import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Flex } from "theme-ui";

import { Page } from "pages/_app";
import { entityKey, fetchEntity } from "src/entities";
import { layoutProps } from "src/entities/layout";
import Maintainers from "src/entities/maintainers";
import MaintenanceRequests from "src/entities/MaintenanceRequests";
import MaintenanceTriggers from "src/entities/MaintenanceTriggers";
import CollapsibleSection from "src/general/CollapsibleSection";
import Loadadble from "src/general/Loadadble";
import useParam from "src/hooks/useParam";
import useTitle from "src/hooks/useTitle";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";

const messages = defineMessages({
  // link text for navigating to edit entity from [entity] page
  editEntity: "Edit",
  // title for maintenance section
  maintenanceTitle: "Maintenance",
  // title text for maintenance triggers section
  triggersTitle: "Triggers",
  // title text for maintainers section
  maintainersTitle: "Maintainers",
});

const EntityPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: entity } = useQuery(
    entityKey(useParam("entity")),
    ({ queryKey: [_, uuid] }) =>
      activeOrganisation && fetchEntity(activeOrganisation.id, uuid),
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
        <Link href={`/entities/${entity.uuid}/edit`}>
          <a>
            <FormattedMessage {...messages.editEntity} />
          </a>
        </Link>
      </Flex>
      <FormattedMessage {...messages.maintenanceTitle} tagName="h2" />
      <MaintenanceRequests entity={entity} />
      <CollapsibleSection
        title={<FormattedMessage {...messages.triggersTitle} tagName="h3" />}
      >
        <MaintenanceTriggers entity={entity} />
      </CollapsibleSection>
      <CollapsibleSection
        title={<FormattedMessage {...messages.maintainersTitle} tagName="h3" />}
      >
        <Maintainers entity={entity} />
      </CollapsibleSection>
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
