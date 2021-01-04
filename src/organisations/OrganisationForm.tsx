import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { formMessages } from "./messages";

import { Organisation, createOrganisation, updateOrganisation } from ".";

import { queryClient } from "src/config/react-query";
import ReturnButton from "src/general/Button/ReturnButton";
import messages from "src/general/messages";

interface Props {
  organisation?: Organisation;
  onSubmit?(organisation: Organisation): void;
}

const OrganisationForm = ({ organisation, onSubmit }: Props) => {
  const { mutate } = useMutation(
    organisation ? updateOrganisation : createOrganisation,
    {
      onSuccess: () => queryClient.invalidateQueries("organisations"),
    }
  );

  return (
    <Formik
      initialValues={{
        name: organisation?.name ?? "",
        organisationIdentifier: organisation?.organisationIdentifier ?? "",
      }}
      onSubmit={(values, { setSubmitting }) =>
        mutate(
          organisation
            ? { id: organisation?.id, locale: "en", ...values }
            : ({
                ...values,
                locale: "en",
              } as Organisation),
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
          <FormattedMessage
            {...formMessages[organisation ? "update" : "create"]}
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
          label={
            <FormattedMessage {...formMessages.organisationIdentifierLabel} />
          }
          name="organisationIdentifier"
        />
      </Form>
    </Formik>
  );
};

OrganisationForm.displayName = "OrganisationForm";

export default OrganisationForm;
