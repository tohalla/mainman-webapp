import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";
import { Box } from "rebass";

import { fetchAccount } from "../../../auth";
import Loadable from "../../Loadadble";

import { accountMenuMessages } from "./messages";

const AccountMenu = () => {
  const { data: account, isFetching } = useQuery("account", fetchAccount);

  return (
    <Loadable isLoading={isFetching}>
      <Box px={4}>
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
      </Box>
    </Loadable>
  );
};

export default AccountMenu;
