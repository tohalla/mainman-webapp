import React from "react";
import { Box, Flex } from "rebass";

import { LayoutProps } from ".";

import Loadable from "src/general/Loadadble";

type Props = Pick<LayoutProps, "isLoading" | "children">;

const AuthLayout = ({ children, isLoading }: Props) => (
  <Flex alignItems="center" flex="1" justifyContent="center">
    <Box width={[7, 8]}>
      <Loadable isLoading={isLoading}>{children}</Loadable>
    </Box>
  </Flex>
);

export default AuthLayout;
