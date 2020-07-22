import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import messages from "./messages";

import { Organisation } from "src/organisations";

interface Props {
  organisation: Organisation;
}

const NoAppliances = ({ organisation }: Props) => {
  return (
    <FormattedMessage
      {...messages.noAppliances}
      values={{
        createLink: (
          <Link
            as="/appliances/new"
            href={{
              pathname: "/appliances/new",
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

export default NoAppliances;
