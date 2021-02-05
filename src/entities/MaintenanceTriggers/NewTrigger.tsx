import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import {
  createMaintenanceTrigger,
  Entity,
  MaintenanceTrigger,
  maintenanceTriggersKey,
} from "..";

import PlainButton from "src/general/Button/PlainButton";

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
    <PlainButton onClick={() => mutate(entity)}>
      <FormattedMessage {...messages.createNew} />
    </PlainButton>
  );
};

export default NewTrigger;
