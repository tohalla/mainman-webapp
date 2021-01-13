import React from "react";
import { FormattedMessage } from "react-intl";
import {
  TableCommonProps,
  UseTableInstanceProps,
  Cell as CellType,
  Row as RowType,
  TableOptions,
} from "react-table";

import messages from "../messages";

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
  <Flex as="td" {...props} overflow="hidden">
    {cell.render("Cell")}
  </Flex>
);

const TBody = <T extends Record<string, unknown>>({
  rows,
  role,
  className,
  style,
  prepareRow,
  columns,
}: Pick<UseTableInstanceProps<T>, "rows" | "prepareRow"> &
  TableCommonProps &
  Pick<TableOptions<T>, "columns">) => {
  return (
    <Flex
      as="tbody"
      className={className}
      flexDirection="column"
      role={role}
      style={style}
    >
      {rows.length > 0 ? (
        rows.map((row) => {
          prepareRow(row);
          return <Row key={row.id} row={row} />;
        })
      ) : (
        <Flex as="tr">
          <Flex
            alignItems="center"
            as="td"
            colSpan={columns.length}
            flex={1}
            justifyContent="center"
          >
            <FormattedMessage {...messages.noEntries} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default TBody;
