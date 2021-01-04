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
      tagName="p"
      {...messages.noAppliances}
      values={{
        createLink: (
          <Link
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
          <Link href={`/organisations/${organisation.id}`}>
            <a> {organisation.name}</a>
          </Link>
        ),
      }}
    />
  );
};

export default NoAppliances;
