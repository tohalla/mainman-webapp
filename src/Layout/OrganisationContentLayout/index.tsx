import React, { ReactFragment, useState } from "react";

import DefaultLayout from "..";
import { Organisation } from "../../organisation";
import OrganisationContext from "../../organisation/OrganisationContext";

import WithHeading from "./WithHeading";

interface Props {
  children: ReactFragment;
}

const OrganisationContentLayout: (props: Props) => JSX.Element = ({
  children,
}: Props) => {
  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >(undefined);

  return (
    <DefaultLayout>
      <OrganisationContext.Provider
        value={{ activeOrganisation, setActiveOrganisation }}
      >
        <WithHeading>{children}</WithHeading>
      </OrganisationContext.Provider>
    </DefaultLayout>
  );
};

export default OrganisationContentLayout;
