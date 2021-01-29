import { css, keyframes } from "@emotion/core";
import React from "react";
import { Button as ThemeUIButton, ButtonProps } from "theme-ui";

interface Props extends ButtonProps {
  loading?: boolean;
}

const Button = ({ loading, children, ...props }: Props) => (
  <ThemeUIButton
    {...props}
    // NOTE: need to cast due to lacking type support
    css={
      typeof loading === "boolean" ? ((styles as unknown) as string) : undefined
    }
    disabled={loading}
  >
    {loading && <div className="indicator" />}
    <span>{children}</span>
  </ThemeUIButton>
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

Button.defaultProps = {
  type: "button",
};

export default Button;
