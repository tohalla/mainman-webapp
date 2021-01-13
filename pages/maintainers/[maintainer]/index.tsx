import Link from "next/link";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import { Flex } from "rebass";
import Loadadble from "src/general/Loadadble";
import useParam from "src/hooks/useParam";
import useTitle from "src/hooks/useTitle";
import OrganisationContentLayout from "src/Layout/OrganisationContentLayout";
import {
  fetchMaintainer,
  maintainerAsString,
  maintainerKey,
} from "src/maintainers";
import Entities from "src/maintainers/entities";
import { layoutProps } from "src/maintainers/layout";
import MaintainerDetails from "src/maintainers/MaintainerDetails";
import messages from "src/maintainers/messages";
import OrganisationContext from "src/organisation/OrganisationContext";

const MaintainerPage: Page = () => {
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: maintainer } = useQuery(
    maintainerKey(Number(useParam("maintainer"))),
    ({ queryKey: [_, id] }) =>
      activeOrganisation && fetchMaintainer(activeOrganisation.id, id),
    { enabled: typeof activeOrganisation !== "undefined" }
  );

  const maintainerString = maintainer && maintainerAsString(maintainer);
  useTitle(maintainerString);

  if (!maintainer) {
    return null;
  }

  return (
    <Loadadble>
      <MaintainerDetails {...maintainer.details} />
      <Flex mt="default">
        <Link href={`/maintainers/${maintainer.id}/edit`}>
          <a>
            <FormattedMessage {...messages.editMaintainer} />
          </a>
        </Link>
      </Flex>
      <Entities maintainer={maintainer} />
    </Loadadble>
  );
};

MaintainerPage.displayName = "MaintainerPage";
MaintainerPage.Layout = OrganisationContentLayout;
MaintainerPage.layoutProps = {
  ...layoutProps,
  options: { organisationSelect: false },
};

export default MaintainerPage;
