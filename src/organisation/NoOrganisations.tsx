import React from "react";
import { FormattedMessage } from "react-intl";

import messages from "./messages";

const NoOrganisations = () => (
  <FormattedMessage {...messages.noOrganisations} />
);

NoOrganisations.displayName = "NoOrganisations";

export default NoOrganisations;
