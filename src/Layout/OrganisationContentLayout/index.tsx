import { identity } from "ramda";
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
    <DefaultLayout {...props} renderContent={identity}>
      <WithHeading description={description} title={title}>
        {DefaultLayout.defaultProps.renderContent(children)}
      </WithHeading>
    </DefaultLayout>
  );
};

OrganisationContentLayout.defaultProps = {
  updatePath: true,
};

export default OrganisationContentLayout;
