import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  Organisation,
  createOrganisation,
  updateOrganisation,
  fetchPlans,
  organisationKey,
  organisationsKey,
  plansKey,
} from "..";
import { formMessages } from "../messages";

import PlanSelection from "./PlanSelection";

import ReturnButton from "src/general/Button/ReturnButton";
import Form from "src/general/Form";
import { Input } from "src/general/Input";
import messages from "src/general/messages";

interface Props {
  organisation?: Organisation;
  onSubmit?(organisation: Organisation): void;
}

const OrganisationForm = ({ organisation, onSubmit }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    organisation ? updateOrganisation : createOrganisation,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(organisationKey(data.id), data);
        queryClient.setQueryData<Record<string, Organisation>>(
          organisationsKey,
          (prev) => ({
            ...prev,
            [data.id]: { ...prev?.[data.id], ...data },
          })
        );
      },
    }
  );
  const { data: plansData } = useQuery(plansKey, fetchPlans);
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
