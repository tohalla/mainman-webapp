import React, { ReactFragment, useState } from "react";
import { useQuery } from "react-query";
import { Flex } from "rebass";

import Loadable from "../general/Loadadble";
import { Organisation, fetchOrganisations } from "../organisation";
import OrganisationContext from "../organisation/OrganisationContext";
import OrganisationSelect from "../organisation/OrganisationSelect";

import DefaultLayout from ".";

interface Props {
  children: ReactFragment;
}

const OrganisationContentLayout: (props: Props) => JSX.Element = ({
  children,
}: Props) => {
  const { data: organisations, isFetching } = useQuery(
    "organisations",
    fetchOrganisations,
    { staleTime: 60000 }
  );
  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >(undefined);

  return (
    <DefaultLayout>
      <OrganisationContext.Provider
        value={{ activeOrganisation, setActiveOrganisation }}
      >
        <Loadable isLoading={isFetching}>
          {organisations && Object.keys(organisations).length > 0 && (
            <Flex
              justifyContent="flex-end"
              mx={[2, 4]}
              my={[2, 4]}
              variant="subdued"
            >
              <OrganisationSelect />
            </Flex>
          )}
          {children}
        </Loadable>
      </OrganisationContext.Provider>
    </DefaultLayout>
  );
};

export default OrganisationContentLayout;
