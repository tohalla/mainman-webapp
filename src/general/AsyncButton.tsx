import { keyframes, css } from "@emotion/core";
import React from "react";
import { ButtonProps, Button } from "rebass";

interface Props extends Omit<ButtonProps, "css"> {
  loading: boolean;
}

const AsyncButton = ({ loading, children, ...props }: Props) => (
  <Button
    {...props}
    // NOTE: need to cast due to lacking type support
    css={(styles as unknown) as string}
    disabled={loading}
  >
    {loading && <div className="indicator" />}
    <span>{children}</span>
  </Button>
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

AsyncButton.displayName = "AsyncButton";
export default AsyncButton;
