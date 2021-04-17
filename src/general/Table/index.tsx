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
import { Box, SxProp } from "theme-ui";

import TBody from "./TBody";
import THead from "./THead";

// eslint-disable-next-line @typescript-eslint/ban-types
interface Props<T extends object>
  extends Pick<
      TableOptions<T>,
      "sortBy" | "data" | "columns" | "defaultColumn"
    >,
    SxProp {
  sortBy: SortingRule<T> | SortingRule<T>[];
}

// eslint-disable-next-line @typescript-eslint/ban-types
const Table = <T extends object>({
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
      defaultCanSort: true,
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
        thead: { backgroundColor: "primary", color: "textInvert" },
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
