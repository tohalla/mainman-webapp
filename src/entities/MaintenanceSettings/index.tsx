import React from "react";

import { Entity } from "..";

import RichEditor from "src/general/RichEditor";

interface Props {
  entity: Entity;
}

const MaintenanceSettings = (_: Props) => {
  return <RichEditor />;
};

export default MaintenanceSettings;
