import React from "react";
import { Box, Flex } from "theme-ui";

import { Props } from ".";

import Loadable from "src/general/Loadadble";

const AuthLayout = ({ children }: Pick<Props, "children">) => (
  <Flex sx={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
    <Box m={4} sx={{ width: [7, 8] }}>
      <Loadable>{children}</Loadable>
    </Box>
  </Flex>
);

export default AuthLayout;
