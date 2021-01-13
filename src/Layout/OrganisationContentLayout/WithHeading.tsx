import React, { useMemo, ReactNode } from "react";
import { useQuery } from "react-query";

import { LayoutProps } from "..";

import NoOrganisations from "./NoOrganisations";

import { Flex, Box } from "rebass";
import Loadable from "src/general/Loadadble";
import { fetchOrganisations, organisationsKey } from "src/organisation";
import OrganisationSelect from "src/organisation/OrganisationSelect";

interface Props extends Pick<LayoutProps, "description" | "title"> {
  children: ReactNode;
}

const WithHeading = ({ children, title, description }: Props) => {
  const { data } = useQuery(organisationsKey, fetchOrganisations, {
    staleTime: 60000,
    suspense: typeof window !== "undefined",
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

  return (
    <Loadable>
      {view === "none" ? (
        <NoOrganisations />
      ) : (
        <>
          <Flex
            alignItems="center"
            flex={0}
            flexDirection="row"
            justifyContent="space-between"
            mb={5}
          >
            {title ? <h1>{title}</h1> : <span />}
            {view === "multiple" && (
              <Box variant="subdued">
                <OrganisationSelect />
              </Box>
            )}
          </Flex>
          {description && <p>{description}</p>}
          {children}
        </>
      )}
    </Loadable>
  );
};

export default WithHeading;
