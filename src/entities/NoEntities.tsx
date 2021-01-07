import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import messages from "./messages";

import { Organisation } from "src/organisation";

interface Props {
  organisation: Organisation;
}

const NoEntities = ({ organisation }: Props) => {
  return (
    <FormattedMessage
      tagName="p"
      {...messages.noEntities}
      values={{
        createLink: (
          <Link
            href={{
              pathname: "/entities/new",
              query: { organisation: organisation.id },
            }}
          >
            <a>
              <FormattedMessage {...messages.createEntity} />
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

export default NoEntities;
