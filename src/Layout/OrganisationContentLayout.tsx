import React, { ReactFragment, useState } from "react";
import { useQuery } from "react-query";
import { Flex } from "rebass";

import Loadable from "../general/Loadadble";
import { Organisation, fetchOrganisations } from "../organisation";
import NoOrganisations from "../organisation/NoOrganisations";
import OrganisationContext from "../organisation/OrganisationContext";
import OrganisationSelect from "../organisation/OrganisationSelect";

import DefaultLayout from ".";

interface Props {
  children: ReactFragment;
}

const OrganisationContentLayout: (props: Props) => JSX.Element = ({
  children,
}: Props) => {
  const { data, isFetching } = useQuery("organisations", fetchOrganisations, {
    staleTime: 60000,
  });
  const organisations = data ? Object.values(data) : [];

  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >(undefined);

  return (
    <DefaultLayout>
      <OrganisationContext.Provider
        value={{ activeOrganisation, setActiveOrganisation }}
      >
        <Loadable isLoading={isFetching}>
          {organisations.length ? (
            <>
              {organisations.length > 1 && (
                <Flex justifyContent="flex-end" variant="subdued">
                  <OrganisationSelect />
                </Flex>
              )}
              {children}
            </>
          ) : (
            <NoOrganisations />
          )}
        </Loadable>
      </OrganisationContext.Provider>
    </DefaultLayout>
  );
};

export default OrganisationContentLayout;
