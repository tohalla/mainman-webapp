import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, queryCache } from "react-query";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { formMessages } from "./messages";

import { Appliance, createAppliance, updateAppliance } from ".";

import ReturnButton from "src/general/Button/ReturnButton";
import messages from "src/general/messages";
import { Organisation } from "src/organisations";

interface Props {
  appliance?: Appliance;
  onSubmit?(appliance: Appliance): void;
  organisation: Organisation;
}

const ApplianceForm = ({ appliance, onSubmit, organisation }: Props) => {
  const [mutateAppliance] = useMutation(
    appliance ? updateAppliance : createAppliance,
    {
      onSuccess: () => queryCache.invalidateQueries("appliances"),
    }
  );

  return (
    <Formik
      initialValues={{
        name: appliance?.name ?? "",
        description: appliance?.description ?? "",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await mutateAppliance(
          appliance
            ? {
                ...values,
                organisation: organisation.id,
                hash: appliance?.hash,
              }
            : ({
                ...values,
                organisation: organisation.id,
              } as Appliance)
        );
        setSubmitting(false);
        if (onSubmit) {
          onSubmit(response);
        }
      }}
    >
      <Form
        secondaryAction={
          <ReturnButton>
            <FormattedMessage {...messages.cancel} />
          </ReturnButton>
        }
        submitLabel={
          <FormattedMessage
            {...formMessages[appliance ? "update" : "create"]}
          />
        }
      >
        <Field
          as={Input}
          label={<FormattedMessage {...formMessages.nameLabel} />}
          name="name"
          required
        />
        <Field
          as={Input}
          label={<FormattedMessage {...formMessages.description} />}
          name="description"
        />
      </Form>
    </Formik>
  );
};

ApplianceForm.displayName = "ApplianceForm";

export default ApplianceForm;
