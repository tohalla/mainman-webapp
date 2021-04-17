import { useQueryClient } from "react-query";

import { maintenanceRequestsKey } from "src/entities";
import useEvents from "src/hooks/useEvents";
import {
  MaintenanceEvent,
  maintenanceEventsKey,
  MaintenanceRequest,
} from "src/maintenance";

const MaintenanceUpdates = () => {
  const queryClient = useQueryClient();

  useEvents({
    maintenanceRequest: {
      onMessage(event: MessageEvent) {
        const payload: MaintenanceRequest = JSON.parse(event.data);
        void queryClient.invalidateQueries("entities");
        queryClient.setQueryData<Record<string, MaintenanceRequest>>(
          maintenanceRequestsKey(payload.entity),
          (prev) => ({
            ...prev,
            [payload.id]: payload,
          })
        );
      },
    },
    maintenanceEvent: {
      onMessage(event: MessageEvent) {
        const payload: MaintenanceEvent = JSON.parse(event.data);
        void queryClient.invalidateQueries("entities");
        queryClient.setQueryData<Record<string, MaintenanceEvent>>(
          maintenanceEventsKey,
          (prev) => ({
            ...prev,
            [payload.id]: payload,
          })
        );
      },
    },
  });

  return null;
};

export default MaintenanceUpdates;
