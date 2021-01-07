import React, { forwardRef } from "react";
import { Box, BoxProps } from "rebass";

interface Props extends Omit<BoxProps, "css"> {
  isOpen: boolean;
}

const Icon = ({ isOpen }: Pick<Props, "isOpen">) => (
  <svg
    fill="transparent"
    stroke="#666"
    strokeWidth="1.1px"
    transform={isOpen ? "rotate(180)" : undefined}
    viewBox="0 0 20 20"
    width={16}
  >
    <path d="M1,6 L10,15 L19,6" />
  </svg>
);

const Toggle = forwardRef(({ isOpen, ...props }: Props, ref) => (
  <Box {...props} ref={ref}>
    <Icon isOpen={isOpen} />
  </Box>
));

export default Toggle;
