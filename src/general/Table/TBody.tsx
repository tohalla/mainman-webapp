import React from "react";
import { FormattedMessage } from "react-intl";
import {
  TableCommonProps,
  UseTableInstanceProps,
  Cell as CellType,
  Row as RowType,
  TableOptions,
} from "react-table";
import { Flex } from "theme-ui";

import messages from "../messages";

// eslint-disable-next-line @typescript-eslint/ban-types
const Row = <T extends object>({
  row,
}: TableCommonProps & { row: RowType<T> }) => (
  <Flex as="tr">
    {row.cells.map((cell) => {
      const { key, ...props } = cell.getCellProps();
      return <Cell key={key} cell={cell} {...props} />;
    })}
  </Flex>
);

// eslint-disable-next-line @typescript-eslint/ban-types
const Cell = <T extends object>({
  cell,
  ...props
}: TableCommonProps & { cell: CellType<T> }) => (
  <Flex as="td" {...props} sx={{ overflow: "hidden" }}>
    {cell.render("Cell")}
  </Flex>
);

// eslint-disable-next-line @typescript-eslint/ban-types
const TBody = <T extends object>({
  rows,
  role,
  className,
  style,
  prepareRow,
}: Pick<UseTableInstanceProps<T>, "rows" | "prepareRow"> &
  TableCommonProps &
  Pick<TableOptions<T>, "columns">) => {
  return (
    <Flex
      as="tbody"
      className={className}
      role={role}
      style={style}
      sx={{ flexDirection: "column" }}
    >
      {rows.length > 0 ? (
        rows.map((row) => {
          prepareRow(row);
          return <Row key={row.id} row={row} />;
        })
      ) : (
        <Flex as="tr">
          <Flex
            as="td"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              columnSpan: "all",
            }}
          >
            <FormattedMessage {...messages.noEntries} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default TBody;
