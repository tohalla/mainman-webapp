import React from "react";

import { Box } from "rebass";

interface Props {
  fill: string;
  opacity: number;
  height: number;
}

const Loader = ({ fill, opacity, height }: Props) => (
  <Box height={height} width={height}>
    <svg
      fill={fill}
      height="32"
      opacity={opacity}
      viewBox="0 0 32 32"
      width="32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
        opacity=".25"
      />
      <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z">
        <animateTransform
          attributeName="transform"
          dur="0.8s"
          from="0 16 16"
          repeatCount="indefinite"
          to="360 16 16"
          type="rotate"
        />
      </path>
    </svg>
  </Box>
);

Loader.defaultProps = {
  fill: "#000000",
  opacity: 0.4,
  height: 32,
};

export default Loader;
