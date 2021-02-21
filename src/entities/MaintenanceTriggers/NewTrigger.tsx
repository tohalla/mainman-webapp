import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import { createMaintenanceTrigger, Entity, maintenanceTriggersKey } from "..";

import Button from "src/general/Button";
import { MaintenanceTrigger } from "src/maintenance";

interface Props {
  entity: Entity;
}

const messages = defineMessages({
  // text for creating a new maintenance trigger button
  createNew: "Create a new trigger",
});

const NewTrigger = ({ entity }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createMaintenanceTrigger, {
    onSuccess: (trigger) => {
      queryClient.setQueryData<Record<string, MaintenanceTrigger>>(
        maintenanceTriggersKey(entity.uuid),
        (prev) => ({ ...prev, [trigger.uuid]: trigger })
      );
    },
  });

  return (
    <Button onClick={() => mutate(entity)} variant="plain">
      <FormattedMessage {...messages.createNew} />
    </Button>
  );
};

export default NewTrigger;
