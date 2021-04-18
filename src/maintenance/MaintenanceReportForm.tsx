import { Formik } from "formik";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import {
  submitMaintenanceReport,
  MaintenanceTask,
  maintenancTasksKey,
} from ".";

import Form, { FormProps } from "src/general/Form";

interface Props {
  maintenanceTask: MaintenanceTask;
  onSubmit?(maintenanceTask: MaintenanceTask): void;
  formProps?: FormProps;
}

const messages = defineMessages({
  // submit button text
  create: "Submit maintenance report",
});

const MaintenanceReportForm = ({
  maintenanceTask,
  onSubmit,
  formProps,
}: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(submitMaintenanceReport, {
    onSuccess: (data) => {
      queryClient.setQueryData<Record<string, MaintenanceTask>>(
        maintenancTasksKey,
        (prev) => ({
          ...prev,
          [data.uuid]: data,
        })
      );
      onSubmit?.(data);
    },
  });

  return (
    <Formik
      initialValues={{ description: "" }}
      onSubmit={(_, { setSubmitting }) =>
        mutate(maintenanceTask, { onSettled: () => setSubmitting(false) })
      }
    >
      <Form
        submitLabel={<FormattedMessage {...messages.create} />}
        {...formProps}
      />
    </Formik>
  );
};

export default MaintenanceReportForm;
