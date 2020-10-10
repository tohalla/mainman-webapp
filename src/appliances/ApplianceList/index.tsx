import Link from "next/link";
import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Column } from "react-table";

import { Appliance } from "..";

import messages from "./messages";

import Table from "src/general/Table";

interface Props {
  appliances: Record<string, Appliance>;
}

const ApplianceList = ({ appliances }: Props) => {
  const data = useMemo(() => Object.values(appliances), [appliances]);
  const columns = useMemo<Column<Appliance>[]>(
    () => [
      {
        Header: <FormattedMessage {...messages.nameColumnHeader} />,
        accessor: "name",
        Cell: ({
          row: {
            original: { hash, name },
          },
        }) => (
          <Link as={`/appliances/${hash}`} href="/appliances/[appliance]">
            <a>{name}</a>
          </Link>
        ),
      },
      {
        Header: <FormattedMessage {...messages.descriptionColumnHeader} />,
        accessor: "description",
        disableSortBy: true,
        maxWidth: 1500,
      },
    ],
    []
  );

  return <Table columns={columns} data={data} sortBy={{ id: "name" }} />;
};

export default ApplianceList;
