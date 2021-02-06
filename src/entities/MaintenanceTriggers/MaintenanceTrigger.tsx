import { dissoc } from "ramda";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import {
  deleteMaintenanceTrigger,
  Entity,
  MaintenanceTrigger as Trigger,
  maintenanceTriggersKey,
} from "..";

import Button from "src/general/Button";

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
        dissoc(maintenanceTrigger.uuid)
      );
    },
  });

  return (
    <>
      <span>{maintenanceTrigger.uuid}</span>
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
