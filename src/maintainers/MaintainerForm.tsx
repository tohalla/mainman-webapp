import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import Form from "../general/Form";
import Input from "../general/Input";

import { formMessages } from "./messages";

import {
  Maintainer,
  createMaintainer,
  updateMaintainer,
  maintainerKey,
  organisationMaintainersKey,
} from ".";

import ReturnButton from "src/general/Button/ReturnButton";
import messages from "src/general/messages";
import { Organisation } from "src/organisation";

interface Props {
  maintainer?: Maintainer;
  onSubmit?(maintainer: Maintainer): void;
  organisation: Organisation;
}

const MaintainerForm = ({ maintainer, onSubmit, organisation }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    maintainer ? updateMaintainer : createMaintainer,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(maintainerKey(data.id), data);
        queryClient.setQueryData<Record<string, Maintainer>>(
          organisationMaintainersKey(organisation.id),
          (prev) => ({
            ...prev,
            [data.id]: { ...prev?.[data.id], ...data },
          })
        );
      },
    }
  );

  return (
    <Formik
      initialValues={{
        name: maintainer?.details?.name ?? "",
        email: maintainer?.details?.email ?? "",
      }}
      onSubmit={(values, { setSubmitting }) =>
        mutate(
          maintainer
            ? {
                details: { ...values },
                organisation: organisation.id,
                id: maintainer?.id,
              }
            : ({
                details: { ...values },
                organisation: organisation.id,
              } as Maintainer),
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
            {...formMessages[maintainer ? "update" : "create"]}
          />
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
          label={<FormattedMessage {...formMessages.email} />}
          name="email"
          type="email"
        />
      </Form>
    </Formik>
  );
};

MaintainerForm.displayName = "MaintainerForm";

export default MaintainerForm;
