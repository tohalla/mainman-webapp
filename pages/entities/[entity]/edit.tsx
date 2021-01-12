import { useRouter } from "next/router";
import React, { useContext } from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { entityKey, fetchEntity } from "src/entities";
import EntityForm from "src/entities/EntityForm";
import { layoutProps } from "src/entities/layout";
import useTitle from "src/hooks/useTitle";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";
import { getParam } from "src/util/routing";

const messages = defineMessages({
  // link text for navigating to creating a new entity
  title: "Create a new entity",
});

const EditEntityPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { push, query } = useRouter();
  const { data: entity } = useQuery(
    entityKey(getParam("entity", query)),
    ({ queryKey: [_, hash] }) =>
      activeOrganisation && fetchEntity(activeOrganisation.id, hash),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  useTitle(entity?.name);
  if (!entity || !activeOrganisation) {
    return null;
  }

  return (
    <EntityForm
      entity={entity}
      onSubmit={() =>
        push({
          pathname: `/entities/${entity.hash}`,
          query: { organisation: entity.organisation },
        })
      }
      organisation={activeOrganisation}
    />
  );
};

EditEntityPage.displayName = "EditEntityPage";
EditEntityPage.Layout = OrganisationContentLayout;
EditEntityPage.layoutProps = {
  ...layoutProps,
  title: <FormattedMessage {...messages.title} />,
};

export default EditEntityPage;
