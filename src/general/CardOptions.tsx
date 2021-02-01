import { useField } from "formik";
import React, { FC, MouseEventHandler } from "react";
import { Grid, GridProps } from "theme-ui";

export type CardProps<T> = T & {
  onClick: MouseEventHandler;
  isSelected: boolean;
};

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
          {...option}
          key={getOptionIdentifier(option)}
          isSelected={option === meta.value}
          onClick={() => setValue(option)}
          sx={{ width: 5 }}
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
