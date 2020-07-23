import React from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import {
  UseTableInstanceProps,
  UseTableHeaderGroupProps,
  HeaderProps,
  TableCommonProps,
} from "react-table";
import { Box } from "rebass";

const HeaderGroup = <T extends Record<string, unknown>>({
  headers,
  role,
  className,
  style,
}: TableCommonProps &
  Omit<UseTableHeaderGroupProps<T>, "getHeaderGroupProps">) => (
  <Box as="tr" className={className} role={role} style={style}>
    {headers.map(({ getHeaderProps, ...props }) => {
      const { key, ...headerProps } = getHeaderProps();
      return <Header key={key} {...headerProps} {...props} />;
    })}
  </Box>
);

const Header = <T extends Record<string, unknown>>({
  render,
  isSorted,
  isSortedDesc,
  role,
  className,
  style,
}: Omit<HeaderProps<T>["column"], "getHeaderProps"> & TableCommonProps) => (
  <Box as="th" className={className} role={role} style={style}>
    {render("Header")}
    {isSortedDesc && <FaSortDown />}
    {isSorted && <FaSortUp />}
  </Box>
);

export default <T extends Record<string, unknown>>({
  headerGroups,
}: Pick<UseTableInstanceProps<T>, "headerGroups">) => (
  <Box as="thead">
    {headerGroups.map(({ getHeaderGroupProps, ...props }) => {
      const { key, ...headerGroupProps } = getHeaderGroupProps();
      return <HeaderGroup key={key} {...headerGroupProps} {...props} />;
    })}
  </Box>
);
