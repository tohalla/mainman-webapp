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
import { Box, SxProps } from "theme-ui";

import TBody from "./TBody";
import THead from "./THead";

interface Props<T extends Record<string, unknown>>
  extends Pick<
      TableOptions<T>,
      "sortBy" | "data" | "columns" | "defaultColumn"
    >,
    SxProps {
  sortBy: SortingRule<T> | SortingRule<T>[];
}

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  defaultColumn,
  sortBy,
  sx,
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
    <Box
      as="table"
      {...getTableProps()}
      sx={{
        backgroundColor: "greyscale.9",
        borderCollapse: "collapse",
        boxShadow: "outline.0",
        thead: { backgroundColor: "primary.neutral", color: "text.light" },
        td: { px: 3, py: 2, boxShadow: "outline.1" },
        th: { p: 3, boxShadow: "outline.2" },
        ...sx,
      }}
    >
      <THead headerGroups={headerGroups} />
      <TBody
        {...getTableBodyProps()}
        columns={columns}
        prepareRow={prepareRow}
        rows={rows}
      />
    </Box>
  );
};

Table.defaultProps = {
  defaultColumn: {
    minWidth: 50,
  },
};

export default Table;
