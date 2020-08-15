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

export default ({ maintainers }: Props) => {
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
    ],
    []
  );

  return <Table columns={columns} data={data} sortBy={{ id: "name" }} />;
};
