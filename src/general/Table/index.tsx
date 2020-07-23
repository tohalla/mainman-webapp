import React, { useMemo } from "react";
import { useTable, useSortBy, TableOptions, SortingRule } from "react-table";
import { Box } from "rebass";

import TBody from "./TBody";
import Thead from "./Thead";

interface Props<T extends Record<string, unknown>>
  extends Pick<TableOptions<T>, "sortBy" | "data" | "columns"> {
  sortBy: SortingRule<T> | SortingRule<T>[];
}

export default <T extends Record<string, unknown>>({
  columns,
  data,
  sortBy,
}: Props<T>) => {
  const initialState = useMemo(
    () => ({ sortBy: Array.isArray(sortBy) ? sortBy : [sortBy] }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable<T>(
    {
      columns,
      data,
      initialState,
    },
    useSortBy
  );

  return (
    <Box as="table" {...getTableProps()}>
      <Thead headerGroups={headerGroups} />
      <TBody {...getTableBodyProps()} prepareRow={prepareRow} rows={rows} />
    </Box>
  );
};
