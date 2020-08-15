import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import messages from "./messages";

import { Organisation } from "src/organisations";

interface Props {
  organisation: Organisation;
}

const NoMaintainers = ({ organisation }: Props) => {
  return (
    <FormattedMessage
      tagName="p"
      {...messages.noMaintainers}
      values={{
        createLink: (
          <Link
            as="/maintainers/new"
            href={{
              pathname: "/maintainers/new",
              query: { organisation: organisation.id },
            }}
          >
            <a>
              <FormattedMessage {...messages.createAppliace} />
            </a>
          </Link>
        ),
        organisationLink: (
          <Link
            as={`/organisations/${organisation.id}`}
            href="/organisations/[organisation]"
          >
            <a> {organisation.name}</a>
          </Link>
        ),
      }}
    />
  );
};

export default NoMaintainers;
