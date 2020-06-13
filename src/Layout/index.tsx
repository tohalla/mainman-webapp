import React, { ReactFragment } from "react";
import { Flex } from "rebass";

import MainNavigation from "../general/Navigation/MainNavigation";

interface Props {
  children: ReactFragment;
}

const DefaultLayout: (props: Props) => JSX.Element = ({ children }: Props) => (
  <>
    <MainNavigation />
    <Flex as="main" flex={1} flexDirection="column" mx={[2, 5]} my={[2, 5]}>
      {children}
    </Flex>
  </>
);

export default DefaultLayout;
