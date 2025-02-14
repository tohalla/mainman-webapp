import { Field, Formik } from "formik";
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";

import { inviteAccount, PendingInvite, organisationInvitesKey } from ".";

import Form, { FormProps } from "src/general/Form";
import Input from "src/general/Input";
import { inputLabels } from "src/general/messages";
import { Organisation } from "src/organisation";
import { APIError } from "src/util/api";
import { mapErrors } from "src/util/misc";

interface Props extends FormProps {
  organisation: Organisation;
}

const messages = defineMessages({
  // text for invite account button
  inviteAccount: "Invite",
});

const InviteAccount = ({ organisation, sx, ...props }: Props) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    PendingInvite,
    APIError,
    Creatable<PendingInvite>
  >(inviteAccount, {
    onSuccess: (invite) => {
      queryClient.setQueryData<Record<string, PendingInvite>>(
        organisationInvitesKey(organisation.id),
        (prev) => ({ ...prev, [invite.uuid]: invite })
      );
    },
  });

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={({ email }, { setSubmitting, setErrors }) =>
        mutate(
          { email, organisation: organisation.id },
          {
            onSettled: () => setSubmitting(false),
            onError: (error) => setErrors(mapErrors(error)[0]),
          }
        )
      }
    >
      <Form
        inline
        submitLabel={<FormattedMessage {...messages.inviteAccount} />}
        sx={{ width: ["auto", 7], ...sx }}
        {...props}
      >
        <Field
          component={Input}
          label={<FormattedMessage {...inputLabels.email} />}
          name="email"
          required
          type="email"
        />
      </Form>
    </Formik>
  );
};

export default InviteAccount;
