import React from "react";
import { Box, Flex } from "rebass";

import { Props } from ".";

import Loadable from "src/general/Loadadble";

const AuthLayout = ({ children }: Pick<Props, "children">) => (
  <Flex alignItems="center" flex="1" justifyContent="center">
    <Box width={[7, 8]}>
      <Loadable>{children}</Loadable>
    </Box>
  </Flex>
);

export default AuthLayout;
