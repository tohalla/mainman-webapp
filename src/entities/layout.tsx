import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

import { LayoutProps } from "src/Layout";

const messages = defineMessages({
  // link text for navigating to entities root page
  entities: "All entities",
  // link text for navigating to creating a new entity
  newEntity: "Create a new entity",
});

export const layoutProps: Partial<LayoutProps> = {
  subPages: [
    {
      children: <FormattedMessage {...messages.entities} />,
      href: "/entities",
    },
    {
      children: <FormattedMessage {...messages.newEntity} />,
      href: "/entities/new",
    },
  ],
};
