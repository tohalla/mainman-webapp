import React, { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import { Label, Flex } from "theme-ui";

interface Props
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label: JSX.Element;
  name: string;
}

const Select = ({ children, name, label, ...props }: Props) => (
  <Flex sx={{ alignItems: "center" }}>
    <Label htmlFor={name} mr={4}>
      {label}
    </Label>
    <select name={name} {...props}>
      {children}
    </select>
  </Flex>
);

Select.displayName = "Select";

export default Select;
