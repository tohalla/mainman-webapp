import { useField } from "formik";
import React, { FC, MouseEventHandler } from "react";
import { Grid, GridProps, SxProp } from "theme-ui";

export interface CardProps<T> extends SxProp {
  onClick: MouseEventHandler;
  isSelected: boolean;
  value: T;
}

interface Props<T> extends GridProps {
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
  sx,
  ...props
}: Props<T>) => {
  const [, meta, { setValue }] = useField<T>(name);

  return (
    <Grid
      sx={{
        alignSelf: "stretch",
        flexWrap: "wrap",
        ...sx,
      }}
      {...props}
    >
      {options?.map((option) => (
        <Card
          key={getOptionIdentifier(option)}
          isSelected={option === meta.value}
          onClick={() => setValue(option)}
          value={option}
        />
      ))}
    </Grid>
  );
};

CardOptions.defaultProps = {
  disabled: false,
};

CardOptions.displayName = "CardOptions";

export default CardOptions;
