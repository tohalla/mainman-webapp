import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Box, Link as ThemeUILink } from "theme-ui";

import { accountKey, fetchAccount, signOut } from "../../../auth";
import PlainButton from "../../Button/PlainButton";
import Loadable from "../../Loadadble";

import { accountMenuMessages } from "./messages";

const AccountMenu = () => {
  const { data: account } = useQuery(accountKey, fetchAccount, {
    staleTime: 60000,
  });

  return (
    <Box px={4} py={[4, 0]} sx={{ alignSelf: ["flex-end", "auto"] }}>
      <Loadable>
        <FormattedMessage
          {...accountMenuMessages.greeting}
          values={{
            account: (
              <Link href="/profile">
                <ThemeUILink color="textInvert">
                  {account?.firstName}
                </ThemeUILink>
              </Link>
            ),
          }}
        />
        <PlainButton color="textInvert" ml={5} onClick={signOut}>
          <FormattedMessage {...accountMenuMessages.signOut} />
        </PlainButton>
      </Loadable>
    </Box>
  );
};

export default AccountMenu;
