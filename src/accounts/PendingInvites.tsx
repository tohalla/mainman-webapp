import { dissoc, isEmpty } from "ramda";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Box } from "theme-ui";

import {
  deleteInvite,
  fetchPendingInvites,
  PendingInvite,
  pendingInvitesKey,
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
        pendingInvitesKey(invite.organisation),
        dissoc(invite.uuid)
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

const PendingInvites = ({ organisation }: Props) => {
  const { data } = useQuery(pendingInvitesKey(organisation.id), () =>
    fetchPendingInvites(organisation.id)
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

export default PendingInvites;
