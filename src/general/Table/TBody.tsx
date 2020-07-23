import React from "react";
import {
  TableCommonProps,
  UseTableInstanceProps,
  Cell as CellType,
  Row as RowType,
} from "react-table";
import { Box } from "rebass";

const Row = <T extends Record<string, unknown>>({
  row,
}: TableCommonProps & { row: RowType<T> }) => (
  <Box as="tr">
    {row.cells.map((cell) => {
      const { key, ...props } = cell.getCellProps();
      return <Cell key={key} cell={cell} {...props} />;
    })}
  </Box>
);

const Cell = <T extends Record<string, unknown>>({
  cell,
  ...props
}: TableCommonProps & { cell: CellType<T> }) => (
  <Box as="td" {...props}>
    {cell.render("Cell")}
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
        return <Row key={row.id} row={row} />;
      })}
    </Box>
  );
};
