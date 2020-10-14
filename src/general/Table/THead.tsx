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
}: TableCommonProps & {
  headerGroup: UseTableHeaderGroupProps<T>;
}) => (
  <Flex as="tr" {...props}>
    {headerGroup.headers.map((header) => {
      const { key, ...headerProps } = header.getHeaderProps(
        header.getSortByToggleProps()
      );
      return <Header key={key} column={header} {...headerProps} />;
    })}
  </Flex>
);

const Header = <T extends Record<string, unknown>>({
  column,
  ...props
}: {
  column: ColumnInstance<T>;
} & TableCommonProps) => (
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
  >
    <Flex
      alignItems="center"
      flex="1"
      justifyContent="space-between"
      overflow="hidden"
      px={3}
      py={2}
    >
      {column.render("Header")}
      {column.isSorted && (column.isSortedDesc ? <FaSortDown /> : <FaSortUp />)}
    </Flex>
    <Flex
      alignSelf="stretch"
      onClick={(event) => event.stopPropagation()}
      sx={{
        bottom: 0,
        position: "absolute",
        right: 0,
        top: 0,
        touchAction: "none",
        transform: "translateX(50%)",
        zIndex: 1,
      }}
      title=""
      width="15px"
      {...column.getResizerProps()}
    />
  </Flex>
);

const THead = <T extends Record<string, unknown>>({
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

export default THead;
