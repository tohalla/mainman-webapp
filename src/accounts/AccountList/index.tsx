import React, { useMemo } from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { Column } from "react-table";

import { PublicAccount } from "..";

import Table from "src/general/Table";

const messages = defineMessages({
  // text for header of name column in account list
  nameColumnHeader: "Name",
  // text for header of email column in account list
  emailColumnHeader: "Email",
  // text for header of rolee column in account list
  roleColumnHeader: "Role",
});

interface Props {
  accounts?: Record<string, PublicAccount>;
}

const columns: Column<PublicAccount>[] = [
  {
    Header: <FormattedMessage {...messages.nameColumnHeader} />,
    accessor: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    id: "name",
  },
  {
    Header: <FormattedMessage {...messages.emailColumnHeader} />,
    accessor: "email",
    width: 250,
  },
  {
    Header: <FormattedMessage {...messages.roleColumnHeader} />,
    accessor: ({ role }) => role?.name,
    id: "role",
  },
];

const AccountList = ({ accounts = {} }: Props) => {
  const data = useMemo(() => Object.values(accounts), [accounts]);

  return <Table columns={columns} data={data} sortBy={{ id: "name" }} />;
};

export default AccountList;
