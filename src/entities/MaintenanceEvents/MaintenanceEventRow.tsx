import React from "react";
import { FormattedDate } from "react-intl";
import { Box } from "theme-ui";

import { MaintenanceEvent } from "src/maintenance";

interface Props {
  maintenanceEvent: MaintenanceEvent;
}

const MaintenanceEventRow = ({ maintenanceEvent }: Props) => {
  const { description, createdAt } = maintenanceEvent;

  return (
    <>
      <FormattedDate dateStyle="medium" timeStyle="short" value={createdAt} />
      <Box>{description}</Box>
    </>
  );
};

export default MaintenanceEventRow;
