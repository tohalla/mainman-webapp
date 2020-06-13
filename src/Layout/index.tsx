import React, { ReactFragment, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Flex } from "rebass";

import MainNavigation from "../general/Navigation/MainNavigation";
import { Organisation, fetchOrganisations } from "../organisation";
import OrganisationContext from "../organisation/OrganisationContext";

interface Props {
  children: ReactFragment;
}

const DefaultLayout: (props: Props) => JSX.Element = ({ children }: Props) => {
  const { data: organisations } = useQuery("organisations", fetchOrganisations);

  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >();

  useEffect(() => {
    if (activeOrganisation || !organisations) {
      return;
    }
    setActiveOrganisation(Object.values(organisations)[0]);
  }, [organisations]);

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
