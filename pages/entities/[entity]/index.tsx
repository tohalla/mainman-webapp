import Link from "next/link";
import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Flex } from "theme-ui";

import { Page } from "pages/_app";
import { entityKey, fetchEntity } from "src/entities";
import { layoutProps } from "src/entities/layout";
import Maintainers from "src/entities/maintainers";
import MaintenanceEvents from "src/entities/MaintenanceEvents";
import MaintenanceRequests from "src/entities/MaintenanceRequests";
import MaintenanceSettings from "src/entities/MaintenanceSettings";
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
  // title for pending maintenance requests section
  pendingMaintenanceRequestsTitle: "Pending requests",
  // title for ongoing maintenance events section
  ongoingEventsTitle: "Ongoing events",
  // title text for maintenance settings section
  maintenanceSettingsTilte: "Maintenance settings",
  // title text for maintenance triggers section
  triggersTitle: "Triggers",
  // title text for maintainers section
  maintainersTitle: "Maintainers",
});

const EntityPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const uuid = useParam("entity");
  const { data: entity } = useQuery(
    entityKey(uuid),
    () => fetchEntity(activeOrganisation?.id, uuid),
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
      <CollapsibleSection
        initialExpand
        title={
          <FormattedMessage
            {...messages.pendingMaintenanceRequestsTitle}
            tagName="h3"
          />
        }
      >
        <MaintenanceRequests entity={entity} />
      </CollapsibleSection>
      <CollapsibleSection
        initialExpand
        title={
          <FormattedMessage {...messages.ongoingEventsTitle} tagName="h3" />
        }
      >
        <MaintenanceEvents entity={entity} />
      </CollapsibleSection>
      <CollapsibleSection
        title={
          <FormattedMessage
            {...messages.maintenanceSettingsTilte}
            tagName="h3"
          />
        }
      >
        <MaintenanceSettings entity={entity} />
      </CollapsibleSection>
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
