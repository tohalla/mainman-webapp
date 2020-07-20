import { useRouter } from "next/router";
import React, { ReactFragment, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Flex } from "rebass";

import MainNavigation from "../general/Navigation/MainNavigation";
import { Organisation, fetchOrganisations } from "../organisation";
import OrganisationContext from "../organisation/OrganisationContext";

import { getParam } from "src/util/routing";

export interface LayoutProps {
  children: ReactFragment;
  updatePath: boolean;
}

const DefaultLayout = ({ children, updatePath }: LayoutProps) => {
  const { data: organisations } = useQuery("organisations", fetchOrganisations);
  const { query, replace, pathname } = useRouter();

  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >();

  useEffect(() => {
    if (activeOrganisation || !organisations) {
      return;
    }
    const organisation = getParam("organisation", query);
    if (organisation) {
      setActiveOrganisation(organisations[organisation]);
    } else {
      setActiveOrganisation(Object.values(organisations)[0]);
    }
  }, [organisations, activeOrganisation, query]);

  // update path
  useEffect(() => {
    const organisation = getParam("organisation", query);
    if (
      updatePath &&
      activeOrganisation &&
      Number(organisation) !== activeOrganisation.id
    ) {
      void replace(
        { pathname, query: { organisation: activeOrganisation.id } },
        undefined,
        { shallow: true }
      );
    }
  }, [activeOrganisation, updatePath, query]);

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

DefaultLayout.defaultProps = {
  updatePath: false,
};

export default DefaultLayout;
