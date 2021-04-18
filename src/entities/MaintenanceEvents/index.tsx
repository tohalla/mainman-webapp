import { isEmpty } from "ramda";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Grid } from "theme-ui";

import { Entity, fetchMaintenanceEvents, maintenanceEventsKey } from "..";

import MaintenanceEventRow from "./MaintenanceEventRow";

interface Props {
  entity: Entity;
}

const messages = defineMessages({
  // text to display when no ongoing maintenance events
  noOngoingEvents: "No ongoing events",
});

const MaintenanceEvents = ({ entity }: Props) => {
  const { data } = useQuery(maintenanceEventsKey(entity.uuid), () =>
    fetchMaintenanceEvents(entity)
  );

  return typeof data === "undefined" || isEmpty(data) ? (
    <FormattedMessage {...messages.noOngoingEvents} />
  ) : (
    <Grid sx={{ columnGap: 5, gridTemplateColumns: "repeat(2, auto)" }}>
      {Object.values(data)
        .filter(({ resolvedAt }) => !resolvedAt)
        .map((event) => (
          <MaintenanceEventRow key={event.id} maintenanceEvent={event} />
        ))}
    </Grid>
  );
};

export default MaintenanceEvents;
