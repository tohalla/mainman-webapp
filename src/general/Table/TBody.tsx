import React from "react";
import {
  TableCommonProps,
  UseTableInstanceProps,
  UseTableRowProps,
  UseTableCellProps,
} from "react-table";
import { Box } from "rebass";

const Row = <T extends Record<string, unknown>>({
  cells,
}: TableCommonProps & Omit<UseTableRowProps<T>, "getRowProps">) => (
  <Box as="tr">
    {cells.map(({ getCellProps, ...props }) => {
      const { key, ...cellProps } = getCellProps();
      return <Cell key={key} {...cellProps} {...props} />;
    })}
  </Box>
);

const Cell = <T extends Record<string, unknown>>({
  className,
  role,
  style,
  render,
}: TableCommonProps & Omit<UseTableCellProps<T>, "getCellProps">) => (
  <Box as="td" className={className} role={role} style={style}>
    {render("Cell")}
  </Box>
);

export default <T extends Record<string, unknown>>({
  rows,
  role,
  className,
  style,
  prepareRow,
}: Pick<UseTableInstanceProps<T>, "rows" | "prepareRow"> &
  TableCommonProps) => {
  return (
    <Box as="tbody" className={className} role={role} style={style}>
      {rows.map((row) => {
        prepareRow(row);
        return <Row key={row.id} {...row} />;
      })}
    </Box>
  );
};
