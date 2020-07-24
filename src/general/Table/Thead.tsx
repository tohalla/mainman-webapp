import React from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  UseTableInstanceProps,
  UseTableHeaderGroupProps,
  TableCommonProps,
  ColumnInstance,
} from "react-table";
import { Flex } from "rebass";

const HeaderGroup = <T extends Record<string, unknown>>({
  headerGroup,
  ...props
}: TableCommonProps & { headerGroup: UseTableHeaderGroupProps<T> }) => (
  <Flex as="tr" {...props}>
    {headerGroup.headers.map((header) => {
      const { key, ...headerProps } = header.getHeaderProps(
        header.getSortByToggleProps()
      );
      return (
        <Header
          key={key}
          {...headerProps}
          column={header}
          // allow resizing for all but last (if full width tables enabled at some point)
          // resizable={i < arr.length - 1}
        />
      );
    })}
  </Flex>
);

const Header = <T extends Record<string, unknown>>({
  column,
  ...props
}: { column: ColumnInstance<T> } & TableCommonProps) => (
  <Flex
    alignItems="stretch"
    as="th"
    justifyContent="space-between"
    sx={{
      position: "relative",
      userSelect: "none",
      boxShadow: "0 1px 1px rgba(0, 0, 0, .7)",
    }}
    {...props}
    overflow="hidden"
  >
    <Flex
      alignItems="center"
      flex="1"
      justifyContent="space-between"
      px={3}
      py={2}
    >
      {column.render("Header")}
      {column.isSorted && (column.isSortedDesc ? <FaSortDown /> : <FaSortUp />)}
    </Flex>
    <Flex
      alignSelf="stretch"
      height="100%"
      sx={{
        position: "absolute",
        right: 0,
        touchAction: "none",
        transform: "translateX(50%)",
        zIndex: 1,
      }}
      title=""
      width="15px"
      {...column.getResizerProps()}
      onClick={(event) => event.stopPropagation()}
    />
  </Flex>
);

export default <T extends Record<string, unknown>>({
  headerGroups,
}: Pick<UseTableInstanceProps<T>, "headerGroups">) => (
  <Flex as="thead">
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
  </Flex>
);
