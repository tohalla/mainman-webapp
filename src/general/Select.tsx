import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";

import { Box, Flex } from "rebass";

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: JSX.Element;
  name: string;
}

const Select = ({ children, name, label, ...props }: Props) => (
  <Flex alignItems="center">
    <Box as="label" htmlFor={name} mr={4}>
      {label}
    </Box>
    <select name={name} {...props}>
      {children}
    </select>
  </Flex>
);

Select.displayName = "Select";

export default Select;
