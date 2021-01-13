import {
  UseComboboxActions,
  UseComboboxPropGetters,
  UseComboboxState,
} from "downshift";
import React, { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

import messages from "../messages";

import { Box, BoxKnownProps, Flex } from "rebass";

interface Props<T>
  extends BoxKnownProps,
    Pick<UseComboboxPropGetters<T>, "getMenuProps" | "getItemProps">,
    Pick<UseComboboxState<T>, "highlightedIndex">,
    Pick<UseComboboxActions<T>, "selectItem"> {
  isOpen: boolean;
  items: T[];
  renderItem(item: T): ReactNode;
  getKey(item: T): string;
}

interface ItemProps<T>
  extends BoxKnownProps,
    Pick<Props<T>, "getItemProps" | "selectItem"> {
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
  sx,
  selectItem,
  ...props
}: ItemProps<T>) => (
  <Box
    as="li"
    backgroundColor={isActive ? "greyscale.8" : "transparent"}
    p={2}
    sx={{ userSelect: "none", ...sx }}
    {...props}
    {...getItemProps({ index, item })}
    onClick={() => selectItem(item)}
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
  getKey,
  selectItem,
  ...props
}: Props<T>) => (
  <Box
    as="ul"
    backgroundColor="greyscale.9"
    display={isOpen ? "flex" : "none"}
    mt={2}
    p={2}
    sx={{ listStyle: "none", flexDirection: "column", boxShadow: 1, ...sx }}
    {...props}
    {...getMenuProps()}
  >
    {items.length ? (
      items.map((item, index) => (
        <Item
          key={getKey(item)}
          getItemProps={getItemProps}
          index={index}
          isActive={highlightedIndex === index}
          item={item}
          render={renderItem}
          selectItem={selectItem}
        />
      ))
    ) : (
      <Flex color="indicator.disabled" fontSize={1}>
        <FormattedMessage {...messages.noEntries} />
      </Flex>
    )}
  </Box>
);

export default Menu;
