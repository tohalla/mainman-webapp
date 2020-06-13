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
        <Link href="/organisations">
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
