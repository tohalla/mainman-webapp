import React from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  UseTableInstanceProps,
  UseTableHeaderGroupProps,
  TableCommonProps,
  ColumnInstance,
} from "react-table";
import { Box, Flex } from "rebass";

const HeaderGroup = <T extends Record<string, unknown>>({
  headerGroup,
  ...props
}: TableCommonProps & { headerGroup: UseTableHeaderGroupProps<T> }) => (
  <Box as="tr" {...props}>
    {headerGroup.headers.map((header) => {
      const { key, ...headerProps } = header.getHeaderProps(
        header.getSortByToggleProps()
      );
      return <Header key={key} {...headerProps} column={header} />;
    })}
  </Box>
);

const Header = <T extends Record<string, unknown>>({
  column,
  ...props
}: { column: ColumnInstance<T> } & TableCommonProps) => (
  <Box as="th" {...props}>
    <Flex
      alignItems="center"
      justifyContent="space-between"
      sx={{ userSelect: "none" }}
    >
      {column.render("Header")}
      {column.isSorted && (column.isSortedDesc ? <FaSortDown /> : <FaSortUp />)}
    </Flex>
  </Box>
);

export default <T extends Record<string, unknown>>({
  headerGroups,
}: Pick<UseTableInstanceProps<T>, "headerGroups">) => (
  <Box as="thead">
    {headerGroups.map((headerGroup) => {
      const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
      return (
        <HeaderGroup
          key={key}
          {...headerGroupProps}
          headerGroup={headerGroup}
        />
      );
    })}
  </Box>
);
