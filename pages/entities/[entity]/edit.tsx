import { useRouter } from "next/router";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { fetchEntity } from "src/entities";
import EntityForm from "src/entities/EntityForm";
import { layoutProps } from "src/entities/layout";
import { titles } from "src/general/messages";
import useTitle from "src/hooks/useTitle";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import OrganisationContext from "src/organisation/OrganisationContext";
import { getParam } from "src/util/routing";

const EditEntityPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { push, query } = useRouter();
  const { data: entity } = useQuery(
    ["entities", getParam("entity", query)],
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
  title: <FormattedMessage {...titles.newEntity} />,
};

export default EditEntityPage;
