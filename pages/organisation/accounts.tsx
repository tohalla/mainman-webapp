import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import OrganisationContentLayout from "../../src/Layout/OrganisationContentLayout";
import { Page } from "../_app";

import {
  organisationAccountsKey,
  fetchOrganisationAccounts,
} from "src/accounts";
import AccountList from "src/accounts/AccountList";
import { layoutProps } from "src/organisation/layout";
import OrganisationContext from "src/organisation/OrganisationContext";

const messages = defineMessages({
  // title text for organisation accounts
  title: "Accounts",
});

const OrganisationAccountsPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data } = useQuery(
    organisationAccountsKey(activeOrganisation?.id),
    ({ queryKey: [_, organisationId] }) =>
      fetchOrganisationAccounts(organisationId),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  if (!activeOrganisation || !data) {
    return null;
  }

  return <AccountList accounts={data} />;
};

OrganisationAccountsPage.displayName = "OrganisationAccountsPage";
OrganisationAccountsPage.Layout = OrganisationContentLayout;
OrganisationAccountsPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default OrganisationAccountsPage;
