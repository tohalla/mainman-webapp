import React, { ReactFragment } from "react";
import { Box, Flex } from "rebass";

const AuthLayout = ({ children }: { children: ReactFragment }) => (
  <Flex alignItems="center" flex="1" justifyContent="center">
    <Box width={[7, 8]}>{children}</Box>
  </Flex>
);

export default AuthLayout;
