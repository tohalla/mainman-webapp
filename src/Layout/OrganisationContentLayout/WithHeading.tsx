import React, { useMemo, ReactFragment } from "react";
import { useQuery } from "react-query";
import { Flex, Box } from "rebass";

import { LayoutProps } from "..";
import Loadable from "../../general/Loadadble";
import { fetchOrganisations } from "../../organisation";
import OrganisationSelect from "../../organisation/OrganisationSelect";

import NoOrganisations from "./NoOrganisations";

interface Props extends Pick<LayoutProps, "description" | "title"> {
  children: ReactFragment;
}

const WithHeading = ({ children, title, description }: Props) => {
  const { data, isLoading } = useQuery("organisations", fetchOrganisations, {
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

  return view === "none" ? (
    <NoOrganisations />
  ) : (
    <>
      {view === "multiple" && (
        <Flex justifyContent="flex-end">
          <Flex
            alignItems="center"
            flex={1}
            flexDirection="row"
            justifyContent="space-between"
          >
            {title && <h1>{title}</h1>}
            <Loadable isLoading={isLoading}>
              <Box variant="subdued">
                <OrganisationSelect />
              </Box>
            </Loadable>
          </Flex>
        </Flex>
      )}
      {description && <p>{description}</p>}
      {children}
    </>
  );
};

export default WithHeading;
