import { useCombobox, UseComboboxProps } from "downshift";
import React, { ReactNode, useState } from "react";
import { BoxProps, Flex } from "rebass";

import Menu from "./Menu";
import Toggle from "./Toggle";

import useDidUpdate from "src/hooks/useDidUpdate";

interface Props<T>
  extends Omit<BoxProps, "css" | "onChange">,
    Pick<UseComboboxProps<T>, "itemToString" | "initialSelectedItem"> {
  items: T[];
  renderItem?(item: T): ReactNode;
  onChange(item: T | null): void;
  filterPredicate(query: string): (item: T) => boolean;
}

const Lookup = <T extends unknown>({
  items: allItems,
  renderItem = String,
  itemToString = String,
  initialSelectedItem,
  onChange,
  sx,
  filterPredicate,
  ...props
}: Props<T>) => {
  const [items, setItems] = useState(allItems);
  const {
    isOpen,
    highlightedIndex,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    getInputProps,
    getComboboxProps,
    selectedItem,
  } = useCombobox<T>({
    items: allItems,
    itemToString,
    initialSelectedItem,
    onInputValueChange: ({ inputValue }) =>
      setItems(
        inputValue ? allItems.filter(filterPredicate(inputValue)) : allItems
      ),
  });

  useDidUpdate(() => onChange(selectedItem), [selectedItem]);

  return (
    <Flex
      backgroundColor="greyscale.9"
      sx={{
        position: "relative",
        alignItems: "stretch",
        justifyContent: "space-between",
        ...sx,
      }}
      {...props}
      {...getComboboxProps()}
    >
      <Flex
        as="input"
        display="flex"
        flex={1}
        px={3}
        py={2}
        sx={{ border: "none", outline: "unset" }}
        {...getInputProps()}
      />
      <Toggle
        display="flex"
        isOpen={isOpen}
        px={3}
        sx={{ alignItems: "center" }}
        {...getToggleButtonProps()}
      />
      <Menu
        getItemProps={getItemProps}
        getMenuProps={getMenuProps}
        highlightedIndex={highlightedIndex}
        isOpen={isOpen}
        items={items}
        renderItem={renderItem}
        sx={{ position: "absolute", top: "100%", left: 0, right: 0 }}
      />
    </Flex>
  );
};

export default Lookup;
