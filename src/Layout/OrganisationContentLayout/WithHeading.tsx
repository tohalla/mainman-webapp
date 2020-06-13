import React, { useMemo, ReactFragment } from "react";
import { useQuery } from "react-query";
import { Flex } from "rebass";

import Loadable from "../../general/Loadadble";
import { fetchOrganisations } from "../../organisation";
import NoOrganisations from "../../organisation/NoOrganisations";
import OrganisationSelect from "../../organisation/OrganisationSelect";

interface Props {
  children: ReactFragment;
}

const WithHeading: (props: Props) => JSX.Element = ({ children }: Props) => {
  const { data, isFetching } = useQuery("organisations", fetchOrganisations, {
    staleTime: 60000,
  });
  const view = useMemo(() => {
    const organisations = data ? Object.values(data) : [];
    if (organisations.length > 1) {
      return "multiple";
    }
    if (organisations.length) {
      return "single";
    }
    return "none";
  }, [data]);

  return view === "single" ? (
    <NoOrganisations />
  ) : (
    <>
      {view === "multiple" && (
        <Flex justifyContent="flex-end" variant="subdued">
          <div>
            <Loadable isLoading={isFetching}>
              <OrganisationSelect />
            </Loadable>
          </div>
        </Flex>
      )}
      {children}
    </>
  );
};

export default WithHeading;
