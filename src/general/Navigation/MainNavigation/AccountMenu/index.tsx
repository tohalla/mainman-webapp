import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Flex, Link as ThemeUILink } from "theme-ui";

import { signOut } from "../../../../auth";
import Button from "../../../Button";
import Loadable from "../../../Loadadble";
import { accountMenuMessages } from "../messages";

import Notifications from "./Notifications";

import { useAccount } from "src/accounts";

const AccountMenu = () => {
  const { data: account } = useAccount();

  return (
    <Flex px={4} py={[4, 0]} sx={{ alignSelf: ["flex-end", "auto"] }}>
      <Loadable>
        <FormattedMessage
          tagName="span"
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
        <Notifications ml={3} />
        <Button color="textInvert" ml={5} onClick={signOut} variant="plain">
          <FormattedMessage {...accountMenuMessages.signOut} />
        </Button>
      </Loadable>
    </Flex>
  );
};

export default AccountMenu;
