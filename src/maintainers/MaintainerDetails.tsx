import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Box } from "theme-ui";

import { MaintainerDetails as Details } from ".";

const messages = defineMessages({
  // label for maintainer name
  name: "Name",
  // label for maintainer name
  email: "Email",
});

const MaintainerDetails = ({ name, email, ...details }: Details) => {
  return (
    <Box
      sx={{
        display: "grid",
        alignSelf: "flex-start",
        gridTemplateColumns: "auto auto",
        gridAutoColumns: "auto",
        columnGap: 5,
        rowGap: 2,
      }}
    >
      {name && (
        <>
          <FormattedMessage {...messages.name} />
          <span>{name}</span>
        </>
      )}
      {email && (
        <>
          <FormattedMessage {...messages.email} />
          <span>{email}</span>
        </>
      )}
      {Object.entries(details).map(([key, value]) => (
        <>
          <span>
            {key in messages ? (
              <FormattedMessage {...messages[key as keyof typeof messages]} />
            ) : (
              key
            )}
          </span>
          <span>{String(value)}</span>
        </>
      ))}
    </Box>
  );
};

export default MaintainerDetails;
