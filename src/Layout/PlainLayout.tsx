import React from "react";
import { Flex } from "theme-ui";

import { Props } from ".";

import Loadable from "src/general/Loadadble";

const PlainLayout = ({ children }: Pick<Props, "children">) => (
  <Flex sx={{ flex: 1, flexDirection: "column", m: 5 }}>
    <Loadable>{children}</Loadable>
  </Flex>
);

export default PlainLayout;
