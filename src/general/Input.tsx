import { FieldProps } from "formik";
import React, { FocusEvent, HTMLProps, ReactNode, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Box, Input as ThemeUIInput, Label } from "theme-ui";

import { errorMessages } from "./messages";

interface Props<T>
  extends Pick<HTMLProps<HTMLInputElement>, "type" | "required">,
    Required<Pick<HTMLProps<HTMLInputElement>, "onChange" | "name">>,
    Partial<FieldProps<T>> {
  disabled: boolean;
  label: ReactNode;
  value?: T;
  onBlur?(e: FocusEvent): void;
  onFocus?(e: FocusEvent): void;
}

const Input = <T extends HTMLProps<HTMLInputElement>["value"]>({
  disabled,
  label,
  name,
  onChange,
  required,
  type,
  value,
  field: formikField,
  form,
  onFocus,
  ...props
}: Props<T>) => {
  const [hasFocus, setHasFocus] = useState(false);
  const { onBlur, ...field } = formikField ?? { value, ...props };

  const labelAbove = field.value === 0 || hasFocus || Boolean(field.value);
  const error = form && "name" in field && form.errors[field.name];

  return (
    <Label
      htmlFor={name}
      mt={3}
      opacity={error ? 0.7 : 1}
      p={2}
      sx={{
        display: "flex",
        position: "relative",
        borderBottomStyle: "solid",
        borderBottomWidth: "3px",
        borderBottomColor: hasFocus
          ? "greyscale.4"
          : error
          ? "indicator.error"
          : "greyscale.6",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          color: !hasFocus && error ? "indicator.error" : "greyscale.3",
          position: "absolute",
          userSelect: "none",
          ...(labelAbove
            ? {
                transform: "scale(0.7) translateY(-160%)",
                transformOrigin: "left",
                transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
              }
            : undefined),
        }}
      >
        {label}
      </Box>
      <ThemeUIInput
        disabled={disabled}
        id={name}
        name={name}
        onBlur={(event) => {
          setHasFocus(false);
          if (typeof onBlur === "function") {
            onBlur(event);
          }
        }}
        onChange={onChange}
        onFocus={(event) => {
          setHasFocus(true);
          if (typeof onFocus === "function") {
            onFocus(event);
          }
        }}
        required={required}
        type={type}
        {...field}
      />
      {error && (
        <Box
          sx={{
            pt: 2,
            bottom: 0,
            right: 0,
            transform: "translateY(100%)",
            fontSize: 1,
            position: "absolute",
            color: "indicator.error",
          }}
        >
          {typeof error === "string" && error in errorMessages ? (
            <FormattedMessage {...errorMessages[error]} />
          ) : (
            error
          )}
        </Box>
      )}
    </Label>
  );
};

Input.defaultProps = {
  disabled: false,
};

Input.displayName = "Input";

export default Input;
