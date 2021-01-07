import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { formMessages } from "./messages";

import { Entity, createEntity, updateEntity } from ".";

import { queryClient } from "src/config/react-query";
import ReturnButton from "src/general/Button/ReturnButton";
import messages from "src/general/messages";
import { Organisation } from "src/organisation";

interface Props {
  entity?: Entity;
  onSubmit?(entity: Entity): void;
  organisation: Organisation;
}

const EntityForm = ({ entity, onSubmit, organisation }: Props) => {
  const { mutate } = useMutation(entity ? updateEntity : createEntity, {
    onSuccess: () => queryClient.invalidateQueries("entities"),
  });

  return (
    <Formik
      initialValues={{
        name: entity?.name ?? "",
        description: entity?.description ?? "",
      }}
      onSubmit={(values, { setSubmitting }) =>
        mutate(
          entity
            ? {
                ...values,
                organisation: organisation.id,
                hash: entity?.hash,
              }
            : ({
                ...values,
                organisation: organisation.id,
              } as Entity),
          {
            onSuccess: (response) => {
              setSubmitting(false);
              if (onSubmit) {
                onSubmit(response);
              }
            },
          }
        )
      }
    >
      <Form
        secondaryAction={
          <ReturnButton>
            <FormattedMessage {...messages.cancel} />
          </ReturnButton>
        }
        submitLabel={
          <FormattedMessage {...formMessages[entity ? "update" : "create"]} />
        }
      >
        <Field
          as={Input}
          label={<FormattedMessage {...formMessages.name} />}
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

EntityForm.displayName = "EntityForm";

export default EntityForm;
