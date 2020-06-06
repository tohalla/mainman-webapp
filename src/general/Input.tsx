import { path } from "ramda";
import React, { HTMLProps, ReactNode, useState } from "react";

import styled from "../theme/styled";

interface Props
  extends Pick<
      HTMLProps<HTMLInputElement>,
      "type" | "onBlur" | "onFocus" | "required"
    >,
    Required<Pick<HTMLProps<HTMLInputElement>, "onChange" | "name" | "value">> {
  label: ReactNode;
  disabled: boolean;
}

const Input = ({
  disabled,
  label,
  name,
  onBlur,
  onChange,
  onFocus,
  required,
  type,
  value,
}: Props) => {
  const [hasFocus, setHasFocus] = useState(false);

  return (
    <InputContainer
      disabled={disabled}
      hasFocus={hasFocus}
      labelAbove={value === 0 || hasFocus || Boolean(value)}
    >
      <label htmlFor={name}>
        <span>{label}</span>
        <input
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
          value={value}
        />
      </label>
    </InputContainer>
  );
};

Input.defaultProps = {
  disabled: false,
};

const InputContainer = styled.div<{
  disabled: boolean;
  labelAbove: boolean;
  hasFocus: boolean;
}>`
  position: relative;
  label {
    ${({ theme, disabled }) =>
      disabled && `background ${theme.colors.greyscale[7]}`};
    padding: ${path(["theme", "space", 2])};
    ${({ hasFocus, theme }) =>
      `border-bottom: 3px solid ${theme.colors.greyscale[hasFocus ? 4 : 6]}`};
    > span {
      opacity: 0.5;
      position: absolute;
      user-select: none;
      ${({ labelAbove }) =>
        labelAbove &&
        `
      transform: scale(0.7) translateY(-1.5rem);
      transform-origin: top left;
      transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
  `}
    }
    input {
      background: none;
      border: none;
    }
  }
`;

Input.displayName = "Input";

export default Input;
