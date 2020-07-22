import React from "react";

import DefaultLayout, { LayoutProps } from "..";

import WithHeading from "./WithHeading";

const OrganisationContentLayout = ({
  children,
  description,
  title,
  ...props
}: LayoutProps) => {
  return (
    <DefaultLayout {...props}>
      <WithHeading description={description} title={title}>
        {children}
      </WithHeading>
    </DefaultLayout>
  );
};

OrganisationContentLayout.defaultProps = {
  updatePath: true,
};

export default OrganisationContentLayout;
