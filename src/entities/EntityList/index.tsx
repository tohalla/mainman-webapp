import Link from "next/link";
import React, { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { Column } from "react-table";

import { Entity } from "..";

import messages from "./messages";

import Table from "src/general/Table";

interface Props {
  entities: Record<string, Entity>;
}

const EntityList = ({ entities }: Props) => {
  const data = useMemo(() => Object.values(entities), [entities]);
  const columns = useMemo<Column<Entity>[]>(
    () => [
      {
        Header: <FormattedMessage {...messages.nameColumnHeader} />,
        accessor: "name",
        Cell: ({
          row: {
            original: { hash, name },
          },
        }) => (
          <Link href={`/entities/${hash}`}>
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

export default EntityList;
