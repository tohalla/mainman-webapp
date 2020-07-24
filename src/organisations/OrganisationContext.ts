import React from "react";

import { Organisation } from ".";

export default React.createContext<{
  activeOrganisation: Organisation | undefined;
  setActiveOrganisation: (organisation: Organisation) => void;
}>({
  activeOrganisation: undefined,
  setActiveOrganisation: () => true,
});
