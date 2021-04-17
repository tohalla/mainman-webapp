import { assocPath } from "ramda";
import React from "react";
import { FormattedDate } from "react-intl";
import { useMutation, useQueryClient } from "react-query";
import { Box } from "theme-ui";

import { Entity, maintenanceRequestsKey } from "..";

import Button from "src/general/Button";
import {
  createMaintenanceEvent,
  MaintenanceEvent,
  MaintenanceRequest,
  maintenanceEventsKey,
} from "src/maintenance";
import { APIError } from "src/util/api";

interface Props {
  entity: Entity;
  maintenanceRequest: MaintenanceRequest;
}

const MaintenanceRequestRow = ({ maintenanceRequest, entity }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: accept } = useMutation<
    MaintenanceEvent,
    APIError,
    Creatable<MaintenanceEvent>
  >((event) => createMaintenanceEvent(entity, event), {
    onSuccess: (event) => {
      queryClient.setQueryData<Record<string, MaintenanceEvent>>(
        maintenanceEventsKey(event.id),
        (prev) => ({ ...prev, [event.id]: event })
      );
      if (event.maintenanceRequest) {
        const { maintenanceRequest: request } = event;
        queryClient.setQueryData<Record<string, MaintenanceRequest>>(
          maintenanceRequestsKey(entity.uuid),
          (prev = {}) =>
            assocPath([request, "processedAt"], new Date().toISOString(), prev)
        );
      }
    },
  });

  const { description, createdAt, id } = maintenanceRequest;

  return (
    <>
      <FormattedDate dateStyle="medium" timeStyle="short" value={createdAt} />
      <Box>{description}</Box>
      <Button
        onClick={() =>
          accept({ maintenanceRequest: id, entity: entity.uuid, description })
        }
        variant="plain"
      >
        Accept
      </Button>
    </>
  );
};

export default MaintenanceRequestRow;
