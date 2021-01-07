import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import messages from "./messages";

import { Organisation } from "src/organisation";

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
          <Link href={`/organisation/${organisation.id}`}>
            <a> {organisation.name}</a>
          </Link>
        ),
      }}
    />
  );
};

export default NoMaintainers;
