import { isEmpty } from "ramda";
import React from "react";
import { useQuery } from "react-query";
import { Flex, Grid } from "theme-ui";

import { Entity, fetchMaintenanceTriggers, maintenanceTriggersKey } from "..";

import MaintenanceTrigger from "./MaintenanceTrigger";
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
      {data && !isEmpty(data) && (
        <Grid mb="default" sx={{ gridTemplateColumns: "1fr auto" }}>
          {Object.values(data).map((trigger) => (
            <MaintenanceTrigger
              key={trigger.uuid}
              entity={entity}
              maintenanceTrigger={trigger}
            />
          ))}
        </Grid>
      )}
      <NewTrigger entity={entity} />
    </Flex>
  );
};

export default MaintenanceTriggers;
