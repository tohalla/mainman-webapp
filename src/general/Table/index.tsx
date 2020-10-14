import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  TableOptions,
  SortingRule,
  useResizeColumns,
  TableState,
  useFlexLayout,
} from "react-table";
import { Box } from "rebass";

import TBody from "./TBody";
import THead from "./THead";

interface Props<T extends Record<string, unknown>>
  extends Pick<
    TableOptions<T>,
    "sortBy" | "data" | "columns" | "defaultColumn"
  > {
  sortBy: SortingRule<T> | SortingRule<T>[];
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  defaultColumn,
  sortBy,
}: Props<T>) => {
  const initialState = useMemo<Partial<TableState>>(
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
      defaultColumn,
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout
  );

  return (
    <Box overflow="auto" width="100%">
      <Box
        as="table"
        {...getTableProps()}
        sx={{
          borderColor: "greyscale.2",
          borderWidth: "1px",
          borderStyle: "solid",
          borderCollapse: "collapse",
        }}
      >
        <THead headerGroups={headerGroups} />
        <TBody {...getTableBodyProps()} prepareRow={prepareRow} rows={rows} />
      </Box>
    </Box>
  );
};

Table.defaultProps = {
  defaultColumn: {
    minWidth: 50,
  },
};

export default Table;
