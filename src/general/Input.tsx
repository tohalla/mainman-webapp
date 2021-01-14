import { useField, FieldProps, FieldMetaProps } from "formik";
import React, { FocusEvent, HTMLProps, ReactNode, useState } from "react";

import { Box, Flex } from "rebass";

interface Props<T>
  extends Pick<HTMLProps<HTMLInputElement>, "type" | "required">,
    Required<Pick<HTMLProps<HTMLInputElement>, "onChange" | "name">> {
  disabled: boolean;
  formik?: Pick<FieldProps<T>, "field" | "meta">;
  label: ReactNode;
  value?: T;
  meta?: FieldMetaProps<T>;
  onBlur?(e: FocusEvent): void;
  onFocus?(e: FocusEvent): void;
}

export const Input = <T extends HTMLProps<HTMLInputElement>["value"]>({
  disabled,
  formik,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  type,
  value,
}: Props<T>) => {
  const [hasFocus, setHasFocus] = useState(false);
  const inputProps = formik ?? { field: { value } };

  const labelAbove =
    inputProps.field.value === 0 || hasFocus || Boolean(inputProps.field.value);

  return (
    <Flex
      as="label"
      disabled={disabled}
      p={2}
      mt={3}
      htmlFor={name}
      sx={{
        position: "relative",
        borderBottomStyle: "solid",
        borderBottomWidth: "3px",
        borderBottomColor: "greyscale.6",
        ...(hasFocus ? { borderBottomColor: "greyscale.4" } : undefined),
      }}
    >
      <Box
        opacity={0.5}
        sx={{
          position: "absolute",
          userSelect: "none",
          ...(labelAbove
            ? {
                transform: "scale(0.7) translateY(-1.5rem)",
                transformOrigin: "top left",
                transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
              }
            : undefined),
        }}
      >
        {label}
      </Box>
      <Box
        as="input"
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
        flex={1}
        sx={{
          background: "none",
          border: "none",
          outline: "none",
          "&:invalid": {
            boxShadow: "none",
          },
        }}
        {...inputProps.field}
      />
    </Flex>
  );
};

Input.defaultProps = {
  disabled: false,
};

const InputWithFormik = <T extends HTMLProps<HTMLInputElement>["value"]>(
  props: Props<T> & { formik: FieldProps<T> }
) => {
  const [field, meta] = useField<T>(props.name);
  const fieldProps: Pick<FieldProps<T>, "field" | "meta"> = { field, meta };

  return <Input {...props} formik={fieldProps} />;
};

InputWithFormik.defaultProps = Input.defaultProps;

Input.displayName = "Input";
InputWithFormik.displayName = "InputWithFormik";

export default InputWithFormik;
