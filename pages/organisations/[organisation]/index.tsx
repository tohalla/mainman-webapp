import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import Loadable from "src/general/Loadadble";
import Section from "src/general/Section";
import { fetchOrganisation } from "src/organisation";
import { getParam } from "src/util/routing";

const OrganisationPage: Page = () => {
  const { query } = useRouter();
  const { data: organisation, isLoading } = useQuery(
    ["organisations", Number(getParam("organisation", query))],
    fetchOrganisation,
    { enabled: typeof query.organisation === "undefined" }
  );

  return (
    <Loadable isLoading={isLoading}>
      <Section>
        <h1>{organisation?.name}</h1>
      </Section>
    </Loadable>
  );
};

OrganisationPage.displayName = "OrganisationPage";

export default OrganisationPage;
