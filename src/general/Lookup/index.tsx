import { useCombobox, UseComboboxProps } from "downshift";
import React, { ReactNode, useEffect, useState } from "react";
import { Flex, FlexProps } from "theme-ui";

import Menu from "./Menu";
import Toggle from "./Toggle";

interface Props<T>
  extends Omit<FlexProps, "onChange">,
    Pick<UseComboboxProps<T>, "initialSelectedItem"> {
  items: T[];
  renderItem?(item: T): ReactNode;
  onChange(item?: T | null): void;
  filterPredicate(query: string): (item: T) => boolean;
  itemToString(item: T): string;
  value?: T | null;
  label: ReactNode;
}

const Lookup = <T extends unknown>({
  items: allItems,
  renderItem = String,
  itemToString = String,
  initialSelectedItem,
  onChange,
  sx,
  filterPredicate,
  value = null,
  label,
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
    inputValue,
    openMenu,
    getComboboxProps,
    selectItem,
    getLabelProps,
  } = useCombobox<T>({
    items: allItems,
    itemToString: (item) => (item ? itemToString(item) : ""),
    initialSelectedItem,
    selectedItem: value,
    onInputValueChange: (changes) =>
      setItems(
        changes.inputValue
          ? allItems.filter(filterPredicate(changes.inputValue))
          : allItems
      ),
    onSelectedItemChange: (changes) => {
      onChange(changes.selectedItem);
    },
  });

  useEffect(() => {
    setItems(
      inputValue ? allItems.filter(filterPredicate(inputValue)) : allItems
    );
  }, [allItems]);

  return (
    <Flex
      as="label"
      sx={{
        flexDirection: "column",
        "> span:first-of-type": {
          fontSize: 1,
          opacity: 0.5,
          marginBottom: 2,
          userSelect: "none",
        },
        ...sx,
      }}
      {...props}
      {...getLabelProps()}
    >
      <span>{label}</span>
      <Flex
        backgroundColor="greyscale.9"
        sx={{
          position: "relative",
          alignItems: "stretch",
          justifyContent: "space-between",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "border.neutral",
        }}
        {...getComboboxProps()}
      >
        <Flex
          as="input"
          display="flex"
          onFocus={openMenu}
          px={3}
          py={2}
          sx={{ flex: 1, border: "none", outline: "unset" }}
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
          getKey={itemToString}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          isOpen={isOpen}
          items={items}
          renderItem={renderItem}
          selectItem={selectItem}
          sx={{ position: "absolute", top: "100%", left: 0, right: 0 }}
        />
      </Flex>
    </Flex>
  );
};

export default Lookup;
