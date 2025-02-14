import { isEmpty } from "ramda";
import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { Page } from "pages/_app";
import { useEntities } from "src/entities";
import EntityList from "src/entities/EntityList";
import { layoutProps } from "src/entities/layout";
import NoEntities from "src/entities/NoEntities";
import Loadable from "src/general/Loadadble";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";

const messages = defineMessages({
  // title text for entity root page
  title: "Entities",
});

const EntitiesPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: entities } = useEntities(activeOrganisation);

  if (!activeOrganisation) {
    return null;
  }

  return (
    <Loadable>
      {!entities || isEmpty(entities) ? (
        <NoEntities organisation={activeOrganisation} />
      ) : (
        <EntityList entities={entities} />
      )}
    </Loadable>
  );
};

EntitiesPage.displayName = "EntitiesPage";
EntitiesPage.Layout = OrganisationContentLayout;
EntitiesPage.layoutProps = {
  title: <FormattedMessage {...messages.title} />,
  ...layoutProps,
};

export default EntitiesPage;
