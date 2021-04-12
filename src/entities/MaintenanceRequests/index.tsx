import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { Box, Flex } from "theme-ui";

import { Entity, fetchMaintenanceRequests, maintenanceRequestsKey } from "..";

import useEvents from "src/hooks/useEvents";
import { MaintenanceRequest } from "src/maintenance";

interface Props {
  entity: Entity;
}

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

  return (
    <Box>
      {data && Object.values(data).map(({ id }) => <Flex key={id}>{id}</Flex>)}
    </Box>
  );
};

export default MaintenanceRequests;
