import React from "react";
import { useQuery } from "react-query";
import { Flex } from "theme-ui";

import { Entity, fetchMaintenanceTriggers, maintenanceTriggersKey } from "..";

import NewTrigger from "./NewTrigger";

interface Props {
  entity: Entity;
}

const MaintenanceTriggers = ({ entity }: Props) => {
  const { data } = useQuery(maintenanceTriggersKey(entity.uuid), () =>
    fetchMaintenanceTriggers(entity)
  );

  return (
    <Flex sx={{ flexDirection: "column" }}>
      {data && (
        <ul>
          {Object.values(data).map(({ uuid }) => (
            <li key={uuid}>{uuid}</li>
          ))}
        </ul>
      )}
      <NewTrigger entity={entity} />
    </Flex>
  );
};

export default MaintenanceTriggers;
