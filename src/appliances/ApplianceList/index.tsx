import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Column } from "react-table";

import { Appliance } from "..";

import messages from "./messages";

import Table from "src/general/Table";

interface Props {
  appliances: Record<string, Appliance>;
}

export default ({ appliances }: Props) => {
  const data = useMemo(() => Object.values(appliances), [appliances]);
  const columns = useMemo<Column<Appliance>[]>(
    () => [
      {
        Header: <FormattedMessage {...messages.nameColumnHeader} />,
        accessor: "name",
      },
      {
        Header: <FormattedMessage {...messages.descriptionColumnHeader} />,
        accessor: "description",
        disableSortBy: true,
      },
    ],
    []
  );

  return <Table columns={columns} data={data} sortBy={{ id: "name" }} />;
};
