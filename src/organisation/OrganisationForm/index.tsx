import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQuery } from "react-query";

import {
  Organisation,
  createOrganisation,
  updateOrganisation,
  fetchPlans,
} from "..";
import { formMessages } from "../messages";

import PlanSelection from "./PlanSelection";

import { queryClient } from "src/config/react-query";
import ReturnButton from "src/general/Button/ReturnButton";
import Form from "src/general/Form";
import { Input } from "src/general/Input";
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
  const { data: plansData } = useQuery("plans", fetchPlans);
  const plans = Object.values(plansData ?? {});

  return (
    <Formik
      initialValues={{
        name: organisation?.name ?? "",
        organisationIdentifier: organisation?.organisationIdentifier ?? "",
        locale: "en",
        plan: plans?.[0],
      }}
      onSubmit={({ plan, ...values }, { setSubmitting }) =>
        mutate(
          Object.assign(values, organisation ? { id: organisation?.id } : {}, {
            plan: plan.id,
          }) as Organisation,
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
        <PlanSelection plans={plans} />
      </Form>
    </Formik>
  );
};

OrganisationForm.displayName = "OrganisationForm";

export default OrganisationForm;
