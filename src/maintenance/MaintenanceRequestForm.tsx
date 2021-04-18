import { Formik, Field } from "formik";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import {
  createMaintenanceRequest,
  MaintenanceRequest,
  MaintenanceTrigger,
} from ".";

import { maintenanceRequestsKey } from "src/entities";
import Form, { FormProps } from "src/general/Form";
import Input from "src/general/Input";

interface Props {
  maintenanceTrigger: MaintenanceTrigger;
  onSubmit?(maintenanceRequest: MaintenanceRequest): void;
  formProps?: FormProps;
}

const messages = defineMessages({
  // submit button text
  create: "Create maintenance request",
  // description field label
  descriptionLabel: "Description",
});

const MaintenanceRequestForm = ({
  maintenanceTrigger,
  onSubmit,
  formProps,
}: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createMaintenanceRequest, {
    onSuccess: (data) => {
      queryClient.setQueryData<Record<string, MaintenanceRequest>>(
        maintenanceRequestsKey(maintenanceTrigger.entity),
        (prev) => ({
          ...prev,
          [data.id]: data,
        })
      );
    },
  });

  return (
    <Formik
      initialValues={{
        description: "",
      }}
      onSubmit={(values, { setSubmitting }) =>
        mutate(
          {
            maintenanceTrigger: maintenanceTrigger.uuid,
            entity: maintenanceTrigger.entity,
            ...values,
          },
          {
            onSettled: () => setSubmitting(false),
            onSuccess: (maintenanceRequest) => onSubmit?.(maintenanceRequest),
          }
        )
      }
    >
      <Form
        submitLabel={<FormattedMessage {...messages.create} />}
        {...formProps}
      >
        <Field
          component={Input}
          label={<FormattedMessage {...messages.descriptionLabel} />}
          name="description"
        />
      </Form>
    </Formik>
  );
};

export default MaintenanceRequestForm;
