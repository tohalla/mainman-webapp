import React, { ReactFragment } from "react";

import DefaultLayout from "..";

import WithHeading from "./WithHeading";

interface Props {
  children: ReactFragment;
}

const OrganisationContentLayout: (props: Props) => JSX.Element = ({
  children,
}: Props) => {
  return (
    <DefaultLayout>
      <WithHeading>{children}</WithHeading>
    </DefaultLayout>
  );
};

export default OrganisationContentLayout;
