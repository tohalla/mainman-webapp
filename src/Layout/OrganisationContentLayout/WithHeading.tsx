import React, { useMemo, ReactNode } from "react";
import { useQuery } from "react-query";
import { Flex, Box } from "rebass";

import { LayoutProps } from "..";
import Loadable from "../../general/Loadadble";
import { fetchOrganisations } from "../../organisations";
import OrganisationSelect from "../../organisations/OrganisationSelect";

import NoOrganisations from "./NoOrganisations";

interface Props extends Pick<LayoutProps, "description" | "title"> {
  children: ReactNode;
}

const WithHeading = ({ children, title, description }: Props) => {
  const { data } = useQuery("organisations", fetchOrganisations, {
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
