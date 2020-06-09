import { keyframes, css } from "@emotion/core";
import React from "react";
import { ButtonProps, Button as RebassButton } from "rebass";

interface Props extends Omit<ButtonProps, "css"> {
  loading?: boolean;
}

const Button = ({ loading, children, ...props }: Props) => (
  <RebassButton
    {...props}
    // NOTE: need to cast due to lacking type support
    css={
      typeof loading === "boolean" ? ((styles as unknown) as string) : undefined
    }
    disabled={loading}
    px={3}
    py={2}
  >
    {loading && <div className="indicator" />}
    <span>{children}</span>
  </RebassButton>
);

const loading = keyframes`
  0% {
    left: -80%;
  }
  100% {
    left: 100%;
  }
`;

const styles = css`
  position: relative;
  overflow: hidden;
  & > span {
    position: relative;
  }

  .indicator {
    width: 80%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.6) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    bottom: 0;
    position: absolute;
    height: 5px;
    animation: ${loading} alternate 1s infinite ease-in-out;
  }
`;

Button.displayName = "AsyncButton";
export default Button;
