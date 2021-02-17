import React from "react";
import { useQuery } from "react-query";
import { Box } from "theme-ui";

import { fetchPendingInvites, pendingInvitesKey } from ".";

import { Organisation } from "src/organisation";

interface Props {
  organisation: Organisation;
}

const PendingInvites = ({ organisation }: Props) => {
  const { data } = useQuery(pendingInvitesKey(organisation.id), () =>
    fetchPendingInvites(organisation.id)
  );

  return (
    <Box>
      {data &&
        Object.values(data).map(({ uuid, email }) => (
          <Box key={uuid}>{email}</Box>
        ))}
    </Box>
  );
};

export default PendingInvites;
