import { useRouter } from "next/router";
import React, { ReactFragment, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Flex } from "rebass";

import MainNavigation from "../general/Navigation/MainNavigation";
import { Organisation, fetchOrganisations } from "../organisation";
import OrganisationContext from "../organisation/OrganisationContext";

import { getParam } from "src/util/routing";

interface Props {
  children: ReactFragment;
}

const DefaultLayout: (props: Props) => JSX.Element = ({ children }: Props) => {
  const { data: organisations } = useQuery("organisations", fetchOrganisations);
  const { query, push, pathname, asPath } = useRouter();

  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >();

  useEffect(() => {
    if (activeOrganisation || !organisations) {
      return;
    }
    const organisation =
      getParam("organisation", query) ??
      localStorage.getItem("activeOrganisation");
    if (organisation) {
      setActiveOrganisation(organisations[organisation]);
    } else {
      setActiveOrganisation(Object.values(organisations)[0]);
    }
  }, [organisations]);

  useEffect(() => {
    const organisation = getParam("organisation", query);
    if (
      activeOrganisation &&
      organisation &&
      Number(organisation) !== activeOrganisation.id
    ) {
      void push(
        pathname,
        asPath.replace(
          /(\/organisations\/)(\d+)/,
          `$1${String(activeOrganisation.id)}`
        )
      );
    }
  }, [activeOrganisation]);

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
