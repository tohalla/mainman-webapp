import Link from "next/link";
import React from "react";
import { FormattedMessage } from "react-intl";

import messages from "./messages";

const NoOrganisations = () => (
  <FormattedMessage
    {...messages.noOrganisations}
    tagName="span"
    values={{
      link: (
        <Link href="/organisation/new">
          <a>
            <FormattedMessage {...messages.noOrganisationsCreateNew} />
          </a>
        </Link>
      ),
    }}
  />
);

NoOrganisations.displayName = "NoOrganisations";

export default NoOrganisations;
