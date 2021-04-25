import { useField } from "formik";
import React, { FC, MouseEventHandler } from "react";
import { Grid, GridProps, CardProps as ThemeUICardPRops } from "theme-ui";

export interface CardProps<T> extends ThemeUICardPRops {
  onClick: MouseEventHandler;
  isSelected: boolean;
  value: T;
}

interface Props<T> extends Omit<GridProps, "onChange"> {
  Card: FC<CardProps<T>>;
  name: string;
  options?: T[];
  getOptionIdentifier(option: T): string;
  onChange?(option: T): void;
}

const CardOptions = <T extends unknown>({
  Card,
  name,
  options,
  getOptionIdentifier,
  onChange,
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
          onClick={() => {
            setValue(option);
            onChange?.(option);
          }}
          onKeyPress={({ key }) => {
            if (key === "Enter") {
              setValue(option);
            }
          }}
          tabIndex={0}
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
