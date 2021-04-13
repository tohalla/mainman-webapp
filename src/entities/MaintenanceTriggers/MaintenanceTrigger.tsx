import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import { deleteMaintenanceTrigger, Entity, maintenanceTriggersKey } from "..";

import Button from "src/general/Button";
import SelectOnClick from "src/general/SelectOnClick";
import { MaintenanceTrigger as Trigger } from "src/maintenance";

interface Props {
  maintenanceTrigger: Trigger;
  entity: Entity;
}

const messages = defineMessages({
  // text for delete maintenance trigger button
  deleteMaintenanceTrigger: "Delete",
});

const MaintenanceTrigger = ({ entity, maintenanceTrigger }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteMaintenanceTrigger, {
    onSuccess: () => {
      queryClient.setQueryData<Record<string, Trigger>>(
        maintenanceTriggersKey(entity.uuid),
        ({ [maintenanceTrigger.uuid]: _, ...triggers } = {}) => triggers
      );
    },
  });

  return (
    <>
      <SelectOnClick>{maintenanceTrigger.uuid}</SelectOnClick>
      <Button
        onClick={() => mutate({ entity, maintenanceTrigger })}
        variant="plain"
      >
        <FormattedMessage {...messages.deleteMaintenanceTrigger} />
      </Button>
    </>
  );
};

export default MaintenanceTrigger;
