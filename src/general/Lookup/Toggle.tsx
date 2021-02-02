import React, { forwardRef } from "react";
import { Flex, InputProps } from "theme-ui";

interface Props extends InputProps {
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

const Toggle = forwardRef<HTMLDivElement, Props>(
  ({ isOpen, ...props }: Props, ref) => (
    <Flex {...props} ref={ref}>
      <Icon isOpen={isOpen} />
    </Flex>
  )
);

export default Toggle;
