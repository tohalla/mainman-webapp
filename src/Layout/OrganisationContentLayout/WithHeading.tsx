import React, { useMemo, ReactNode } from "react";
import { useQuery } from "react-query";
import { Flex, Text } from "theme-ui";

import { LayoutProps } from "..";

import NoOrganisations from "./NoOrganisations";

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
            mb={5}
            sx={{
              alignItems: "center",
              alignSelf: "stretch",
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {title ? <h1>{title}</h1> : <span />}
            {view === "multiple" && (
              <Text variant="subdued">
                <OrganisationSelect />
              </Text>
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
