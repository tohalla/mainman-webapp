import Link from "next/link";
import React, { useMemo } from "react";
import { FormattedMessage, defineMessages } from "react-intl";
import { CellProps, Column } from "react-table";

import { Entity } from "..";

import EntityStatus from "./EntityStatus";

import Table from "src/general/Table";

interface Props {
  entities?: Record<string, Entity>;
}

const messages = defineMessages({
  // text for header of name column in entity list
  nameHeader: "Name",
  // text for header of description column in entity list
  descriptionHeader: "Description",
  // text for header of status column in entity list
  statusHeader: "Status",
  // text for header of open maintenance requests column in entity list
  pendingRequestsHeader: "Open requests",
  // text for header of unfinished maintenance events column in entity list
  unfinishedEventsHeader: "Active events",
});

const columns: Column<Entity>[] = [
  {
    Header: <FormattedMessage {...messages.statusHeader} />,
    id: "status",
    disableResizing: true,
    disableSortBy: true,
    width: 80,
    Cell: ({ row: { original } }: CellProps<Entity>) => (
      <EntityStatus {...original} />
    ),
  },
  {
    Header: <FormattedMessage {...messages.nameHeader} />,
    accessor: "name",
    Cell: ({
      row: {
        original: { uuid, name },
      },
    }) => (
      <Link href={`/entities/${uuid}`}>
        <a>{name}</a>
      </Link>
    ),
  },
  {
    Header: <FormattedMessage {...messages.descriptionHeader} />,
    accessor: "description",
    disableSortBy: true,
    maxWidth: 1500,
  },
  {
    Header: <FormattedMessage {...messages.pendingRequestsHeader} />,
    id: "pendingRequests",
    width: 130,
    Cell: ({ row: { original } }: CellProps<Entity>) =>
      original.pendingRequests ?? 0,
  },
  {
    Header: <FormattedMessage {...messages.unfinishedEventsHeader} />,
    id: "unfinishedEvents",
    width: 130,
    Cell: ({ row: { original } }: CellProps<Entity>) =>
      original.unfinishedEvents ?? 0,
  },
];

const EntityList = ({ entities = {} }: Props) => {
  const data = useMemo(() => Object.values(entities), [entities]);

  return <Table columns={columns} data={data} sortBy={{ id: "name" }} />;
};

export default EntityList;
