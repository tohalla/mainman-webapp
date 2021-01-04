import { Formik, Field } from "formik";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation } from "react-query";

import Form from "../general/Form";
import { Input } from "../general/Input";

import { formMessages } from "./messages";

import { Maintainer, createMaintainer, updateMaintainer } from ".";

import { queryClient } from "src/config/react-query";
import ReturnButton from "src/general/Button/ReturnButton";
import messages from "src/general/messages";
import { Organisation } from "src/organisations";

interface Props {
  maintainer?: Maintainer;
  onSubmit?(maintainer: Maintainer): void;
  organisation: Organisation;
}

const MaintainerForm = ({ maintainer, onSubmit, organisation }: Props) => {
  const { mutate } = useMutation(
    maintainer ? updateMaintainer : createMaintainer,
    {
      onSuccess: () => queryClient.invalidateQueries("maintainers"),
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
