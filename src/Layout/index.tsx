import React, { ReactFragment, useState } from "react";
import { Flex } from "rebass";

import MainNavigation from "../general/Navigation/MainNavigation";
import { Organisation } from "../organisation";
import OrganisationContext from "../organisation/OrganisationContext";

interface Props {
  children: ReactFragment;
}

const DefaultLayout: (props: Props) => JSX.Element = ({ children }: Props) => {
  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >(undefined);

  return (
    <OrganisationContext.Provider
      value={{ activeOrganisation, setActiveOrganisation }}
    >
      <MainNavigation />
      <Flex as="main" flex={1} flexDirection="column" mx={[2, 5]} my={[2, 5]}>
        {children}
      </Flex>
    </OrganisationContext.Provider>
  );
};

export default DefaultLayout;
