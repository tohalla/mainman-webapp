import React from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  UseTableInstanceProps,
  UseTableHeaderGroupProps,
  TableCommonProps,
  ColumnInstance,
} from "react-table";
import { Flex } from "theme-ui";

// eslint-disable-next-line @typescript-eslint/ban-types
const HeaderGroup = <T extends object>({
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

// eslint-disable-next-line @typescript-eslint/ban-types
const Header = <T extends object>({
  column,
  ...props
}: {
  column: ColumnInstance<T>;
} & TableCommonProps) => (
  <Flex
    as="th"
    sx={{
      alignItems: "stretch",
      justifyContent: "space-between",
      position: "relative",
      userSelect: "none",
    }}
    {...props}
  >
    <Flex
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {column.render("Header")}
      {column.isSorted && (column.isSortedDesc ? <FaSortDown /> : <FaSortUp />)}
    </Flex>
    <Flex
      onClick={(event) => event.stopPropagation()}
      sx={{
        alignSelf: "stretch",
        bottom: 0,
        position: "absolute",
        right: 0,
        top: 0,
        touchAction: "none",
        transform: "translateX(50%)",
        width: "15px",
      }}
      title=""
      {...column.getResizerProps?.()}
    />
  </Flex>
);

// eslint-disable-next-line @typescript-eslint/ban-types
const THead = <T extends object>({
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
