import { isEmpty } from "ramda";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Box } from "theme-ui";

import {
  deleteInvite,
  fetchPendingOrganisationInvites,
  PendingInvite,
  organisationInvitesKey,
} from ".";

import Button from "src/general/Button";
import messages from "src/general/messages";
import { Organisation } from "src/organisation";

interface Props {
  organisation: Organisation;
}

const Invite = ({ invite }: { invite: PendingInvite }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteInvite, {
    onSuccess: () => {
      queryClient.setQueryData<Record<string, PendingInvite>>(
        organisationInvitesKey(invite.organisation),
        ({ [invite.uuid]: _, ...invites } = {}) => invites
      );
    },
  });

  return (
    <Box>
      {invite.email}
      <Button ml="default" onClick={() => mutate(invite)} variant="plain">
        <FormattedMessage {...messages.cancel} />
      </Button>
    </Box>
  );
};

const OrganisationInvites = ({ organisation }: Props) => {
  const { data } = useQuery(organisationInvitesKey(organisation.id), () =>
    fetchPendingOrganisationInvites(organisation.id)
  );

  return (
    <Box>
      {isEmpty(data) ? (
        <FormattedMessage {...messages.noEntries} />
      ) : (
        data &&
        Object.values(data).map((invite) => (
          <Invite key={invite.uuid} invite={invite} />
        ))
      )}
    </Box>
  );
};

export default OrganisationInvites;
