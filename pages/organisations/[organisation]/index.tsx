import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import Loadable from "src/general/Loadadble";
import Section from "src/general/Section";
import { fetchOrganisation } from "src/organisations";
import { getParam } from "src/util/routing";

const OrganisationPage: Page = () => {
  const { query } = useRouter();
  const organisationId = Number(getParam("organisation", query));

  const { data: organisation } = useQuery(
    ["organisations", organisationId],
    () => fetchOrganisation(organisationId),
    { enabled: typeof query.organisation === "undefined" }
  );

  return (
    <Loadable>
      <Section>
        <h1>{organisation?.name}</h1>
      </Section>
    </Loadable>
  );
};

OrganisationPage.displayName = "OrganisationPage";

export default OrganisationPage;
