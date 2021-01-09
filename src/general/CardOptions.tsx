import { useField } from "formik";
import React, { FC, MouseEventHandler } from "react";
import { Box } from "rebass";

export type CardProps<T> = T & {
  onClick: MouseEventHandler;
  isSelected: boolean;
};
interface Props<T> {
  Card: FC<CardProps<T>>;
  name: string;
  options?: T[];
}

const CardOptions = <T extends { name: string }>({
  Card,
  name,
  options,
}: Props<T>) => {
  const [, meta, { setValue }] = useField<T>(name);

  return (
    <Box>
      {options?.map((option) => (
        <Card
          {...option}
          key={option.name}
          isSelected={option === meta.value}
          onClick={() => setValue(option)}
        />
      ))}
    </Box>
  );
};

CardOptions.defaultProps = {
  disabled: false,
};

CardOptions.displayName = "CardOptions";

export default CardOptions;
