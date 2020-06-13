import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Box } from "rebass";

import { fetchAccount, signOut } from "../../../auth";
import PlainButton from "../../Button/PlainButton";
import Loadable from "../../Loadadble";

import { accountMenuMessages } from "./messages";

const AccountMenu = () => {
  const { data: account, isFetching } = useQuery("account", fetchAccount, {
    staleTime: 60000,
  });

  return (
    <Box alignSelf={["flex-end", "auto"]} px={4} py={[4, 0]}>
      <Loadable isLoading={isFetching}>
        <FormattedMessage
          {...accountMenuMessages.greeting}
          values={{
            account: (
              <Link href="/profile">
                <a>{account?.firstName}</a>
              </Link>
            ),
          }}
        />
        <PlainButton ml={5} onClick={signOut}>
          <FormattedMessage {...accountMenuMessages.signOut} />
        </PlainButton>
      </Loadable>
    </Box>
  );
};

export default AccountMenu;
