import React from "react";
import {
  TableCommonProps,
  UseTableInstanceProps,
  Cell as CellType,
  Row as RowType,
} from "react-table";
import { Flex } from "rebass";

const Row = <T extends Record<string, unknown>>({
  row,
}: TableCommonProps & { row: RowType<T> }) => (
  <Flex as="tr">
    {row.cells.map((cell) => {
      const { key, ...props } = cell.getCellProps();
      return <Cell key={key} cell={cell} {...props} />;
    })}
  </Flex>
);

const Cell = <T extends Record<string, unknown>>({
  cell,
  ...props
}: TableCommonProps & { cell: CellType<T> }) => (
  <Flex
    as="td"
    {...props}
    overflow="hidden"
    px={3}
    py={2}
    sx={{ boxShadow: "0 1px 1px rgba(0, 0, 0, .4)" }}
  >
    {cell.render("Cell")}
  </Flex>
);

const TBody = <T extends Record<string, unknown>>({
  rows,
  role,
  className,
  style,
  prepareRow,
}: Pick<UseTableInstanceProps<T>, "rows" | "prepareRow"> &
  TableCommonProps) => {
  return (
    <Flex
      as="tbody"
      className={className}
      flexDirection="column"
      role={role}
      style={style}
    >
      {rows.map((row) => {
        prepareRow(row);
        return <Row key={row.id} row={row} />;
      })}
    </Flex>
  );
};

export default TBody;
