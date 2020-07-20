import React from "react";

import DefaultLayout, { LayoutProps } from "..";

import WithHeading from "./WithHeading";

const OrganisationContentLayout = ({ children, ...props }: LayoutProps) => {
  return (
    <DefaultLayout {...props}>
      <WithHeading>{children}</WithHeading>
    </DefaultLayout>
  );
};

OrganisationContentLayout.defaultProps = {
  updatePath: true,
};

export default OrganisationContentLayout;
