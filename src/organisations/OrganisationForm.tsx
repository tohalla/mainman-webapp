import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, queryCache } from "react-query";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { formMessages } from "./messages";

import { Organisation, createOrganisation, updateOrganisation } from ".";

import ReturnButton from "src/general/Button/ReturnButton";
import messages from "src/general/messages";

interface Props {
  organisation?: Organisation;
  onSubmit?(organisation: Organisation): void;
}

const OrganisationForm = ({ organisation, onSubmit }: Props) => {
  const [mutateOrganisation] = useMutation(
    organisation ? updateOrganisation : createOrganisation,
    {
      onSuccess: () => queryCache.invalidateQueries("organisations"),
    }
  );

  return (
    <Formik
      initialValues={{
        name: organisation?.name ?? "",
        organisationIdentifier: organisation?.organisationIdentifier ?? "",
      }}
      onSubmit={async (values, { setSubmitting }) =>
        mutateOrganisation(
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
