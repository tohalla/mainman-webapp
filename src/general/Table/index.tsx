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
import Thead from "./Thead";

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
  sortBy,
  defaultColumn,
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
    useResizeColumns,
    useSortBy,
    useFlexLayout
    // (hooks) => { one col should be resized if going to use full width tables or will go bonkers
    //   hooks.useInstanceBeforeDimensions.push(({ headerGroups: groups }) => {
    //     groups.forEach((group) => {
    //       // eslint-disable-next-line no-param-reassign
    //       group.headers[0].canResize = false;
    //     });
    //   });
    // }
  );

  return (
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
      <Thead headerGroups={headerGroups} />
      <TBody {...getTableBodyProps()} prepareRow={prepareRow} rows={rows} />
    </Box>
  );
};

export default Table;
