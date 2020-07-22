import { useRouter } from "next/router";
import React, { ReactFragment, useState, useEffect, ReactNode } from "react";
import { useQuery } from "react-query";
import { Flex } from "rebass";

import MainNavigation from "../general/Navigation/MainNavigation";
import { Organisation, fetchOrganisations } from "../organisation";
import OrganisationContext from "../organisation/OrganisationContext";

import Loadable from "src/general/Loadadble";
import { getParam } from "src/util/routing";

export interface LayoutProps {
  children: ReactFragment;
  updatePath: boolean;
  title?: ReactNode;
  description?: ReactNode;
  isLoading: boolean;
}

const DefaultLayout = ({
  children,
  description,
  isLoading,
  title,
  updatePath,
}: LayoutProps) => {
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
      <Flex
        as="main"
        flex={1}
        flexDirection="column"
        mx={[2, 5]}
        my={[2, 5]}
        sx={{ h1: { color: "greyscale.2", m: 0 } }}
      >
        <Loadable isLoading={isLoading}>
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {children}
        </Loadable>
      </Flex>
    </OrganisationContext.Provider>
  );
};

DefaultLayout.defaultProps = {
  updatePath: false,
};

export default DefaultLayout;
