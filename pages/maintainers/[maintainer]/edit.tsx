import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import useTitle from "src/hooks/useTitle";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import { fetchMaintainer, maintainerKey } from "src/maintainers";
import { layoutProps } from "src/maintainers/layout";
import MaintainerForm from "src/maintainers/MaintainerForm";
import OrganisationContext from "src/organisation/OrganisationContext";
import { getParam } from "src/util/routing";

const EditMaintainerPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { push, query } = useRouter();
  const { data: maintainer } = useQuery(
    maintainerKey(getParam("maintainer", query)),
    ({ queryKey: [_, hash] }) =>
      activeOrganisation && fetchMaintainer(activeOrganisation.id, hash),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  useTitle(maintainer?.id);
  if (!maintainer || !activeOrganisation) {
    return null;
  }

  return (
    <MaintainerForm
      maintainer={maintainer}
      onSubmit={() =>
        push({
          pathname: `/maintainers/${maintainer.id}`,
          query: { organisation: maintainer.organisation },
        })
      }
      organisation={activeOrganisation}
    />
  );
};

EditMaintainerPage.displayName = "EditMaintainerPage";
EditMaintainerPage.Layout = OrganisationContentLayout;
EditMaintainerPage.layoutProps = layoutProps;

export default EditMaintainerPage;
