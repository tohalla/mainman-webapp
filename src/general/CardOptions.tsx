import { useField } from "formik";
import React, { FC, MouseEventHandler } from "react";
import { Flex } from "theme-ui";

export type CardProps<T> = T & {
  onClick: MouseEventHandler;
  isSelected: boolean;
};
interface Props<T> {
  Card: FC<CardProps<T>>;
  name: string;
  options?: T[];
  getOptionIdentifier(option: T): string;
}

const CardOptions = <T extends { name: string }>({
  Card,
  name,
  options,
  getOptionIdentifier,
}: Props<T>) => {
  const [, meta, { setValue }] = useField<T>(name);

  return (
    <Flex sx={{ flexDirection: "row", flexWrap: "wrap" }}>
      {options?.map((option) => (
        <Card
          {...option}
          key={getOptionIdentifier(option)}
          isSelected={option === meta.value}
          onClick={() => setValue(option)}
        />
      ))}
    </Flex>
  );
};

CardOptions.defaultProps = {
  disabled: false,
};

CardOptions.displayName = "CardOptions";

export default CardOptions;
