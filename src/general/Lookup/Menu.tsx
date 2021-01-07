import { UseComboboxPropGetters, UseComboboxState } from "downshift";
import React, { ReactNode } from "react";
import { Box, BoxProps } from "rebass";

interface Props<T>
  extends Omit<BoxProps, "css">,
    Pick<UseComboboxPropGetters<T>, "getMenuProps" | "getItemProps">,
    Pick<UseComboboxState<T>, "highlightedIndex"> {
  isOpen: boolean;
  items: T[];
  renderItem(item: T): ReactNode;
}

interface ItemProps<T>
  extends Omit<BoxProps, "css">,
    Pick<UseComboboxPropGetters<T>, "getItemProps"> {
  isActive: boolean;
  index: number;
  item: T;
  render(item: T): ReactNode;
}
const Item = <T extends unknown>({
  isActive,
  index,
  item,
  getItemProps,
  render,
  ...props
}: ItemProps<T>) => (
  <Box
    as="li"
    {...getItemProps({ index, item })}
    backgroundColor={isActive ? "greyscale.8" : "transparent"}
    p={2}
    {...props}
  >
    {render(item)}
  </Box>
);

const Menu = <T extends unknown>({
  isOpen,
  items,
  getItemProps,
  getMenuProps,
  renderItem,
  highlightedIndex,
  sx,
  ...props
}: Props<T>) => (
  <Box
    {...props}
    as="ul"
    backgroundColor="greyscale.9"
    mt={2}
    p={2}
    sx={{ listStyle: "none", flexDirection: "column", ...sx }}
    {...getMenuProps()}
    display={isOpen ? "flex" : "none"}
  >
    {items.map((item, index) => (
      <Item
        key={String(item)}
        getItemProps={getItemProps}
        index={index}
        isActive={highlightedIndex === index}
        item={item}
        render={renderItem}
      />
    ))}
  </Box>
);

export default Menu;
