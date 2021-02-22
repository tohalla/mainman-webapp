import React from "react";

import { Entity } from "..";

import RichEditor from "src/general/RichEditor";

interface Props {
  entity: Entity;
}

const MaintenanceSettings = ({ entity }: Props) => {
  return <RichEditor />;
};

export default MaintenanceSettings;
