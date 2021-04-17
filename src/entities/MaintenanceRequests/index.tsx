import { isEmpty } from "ramda";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery, useQueryClient } from "react-query";
import { Grid } from "theme-ui";

import { Entity, fetchMaintenanceRequests, maintenanceRequestsKey } from "..";

import MaintenanceRequestRow from "./MaintenanceRequestRow";

import useEvents from "src/hooks/useEvents";
import { MaintenanceRequest } from "src/maintenance";

interface Props {
  entity: Entity;
}

const messages = defineMessages({
  // text to display when no pending maintenance requests
  noPrendingRequests: "No pending requests",
});

const MaintenanceRequests = ({ entity }: Props) => {
  const queryClient = useQueryClient();
  const { data } = useQuery(maintenanceRequestsKey(entity.uuid), () =>
    fetchMaintenanceRequests(entity)
  );

  useEvents({
    maintenanceRequest: {
      onMessage(event: MessageEvent) {
        const payload: MaintenanceRequest = JSON.parse(event.data);
        queryClient.setQueryData<Record<string, MaintenanceRequest>>(
          maintenanceRequestsKey(entity.uuid),
          (prev) => ({
            ...prev,
            [payload.id]: payload,
          })
        );
      },
    },
  });

  return typeof data === "undefined" || isEmpty(data) ? (
    <FormattedMessage {...messages.noPrendingRequests} />
  ) : (
    <Grid sx={{ columnGap: 5, gridTemplateColumns: "repeat(3, auto)" }}>
      {Object.values(data)
        .filter(({ processedAt }) => !processedAt)
        .map((request) => (
          <MaintenanceRequestRow
            key={request.id}
            entity={entity}
            maintenanceRequest={request}
          />
        ))}
    </Grid>
  );
};

export default MaintenanceRequests;
