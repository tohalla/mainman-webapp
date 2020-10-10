import Link from "next/link";
import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Column } from "react-table";

import { Maintainer } from "..";

import messages from "./messages";

import Table from "src/general/Table";

interface Props {
  maintainers: Record<string, Maintainer>;
}

const MaintainerList = ({ maintainers }: Props) => {
  const data = useMemo(() => Object.values(maintainers), [maintainers]);
  const columns = useMemo<Column<Maintainer>[]>(
    () => [
      {
        Header: <FormattedMessage {...messages.idColumnHeader} />,
        accessor: "id",
        Cell: ({
          row: {
            original: { id },
          },
        }) => (
          <Link as={`/maintainers/${id}`} href="/maintainers/[maintainer]">
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
    ],
    []
  );

  return <Table columns={columns} data={data} sortBy={{ id: "name" }} />;
};

export default MaintainerList;
