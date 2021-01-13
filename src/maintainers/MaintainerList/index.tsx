import Link from "next/link";
import React, { FC, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Column } from "react-table";

import { Maintainer } from "..";

import messages from "./messages";

import Table from "src/general/Table";

interface Props {
  maintainers?: Record<string, Maintainer>;
  columns?: Column<Maintainer>[];
}

export const defaultColumns: Column<Maintainer>[] = [
  {
    Header: <FormattedMessage {...messages.idColumnHeader} />,
    accessor: "id",
    Cell: ({
      row: {
        original: { id },
      },
    }) => (
      <Link href={`/maintainers/${id}`}>
        <a>{id}</a>
      </Link>
    ),
  },
  {
    id: "name",
    accessor: ({ details }) => details?.name ?? "",
    Header: <FormattedMessage {...messages.nameColumnHeader} />,
  },
  {
    id: "email",
    accessor: ({ details }) => details?.email ?? "",
    Header: <FormattedMessage {...messages.emailColumnHeader} />,
  },
];

const MaintainerList: FC<Props> = ({
  maintainers = {},
  columns = defaultColumns,
}) => {
  const data = useMemo(() => Object.values(maintainers), [maintainers]);

  return <Table columns={columns} data={data} sortBy={{ id: "name" }} />;
};

export default MaintainerList;
