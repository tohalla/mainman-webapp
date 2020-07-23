import React from "react";
import { useTable, Column } from "react-table";
import { Box } from "rebass";

import TBody from "./TBody";
import Thead from "./Thead";

interface Props<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
}

export default <T extends Record<string, unknown>>({
  columns,
  data,
}: Props<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>({ columns, data });

  return (
    <Box as="table" {...getTableProps()}>
      <Thead headerGroups={headerGroups} />
      <TBody {...getTableBodyProps()} prepareRow={prepareRow} rows={rows} />
    </Box>
  );
};
