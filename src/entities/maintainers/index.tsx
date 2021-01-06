import React from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Entity, fetchEntityMaintainers } from "..";

import messages from "./messages";

import MaintainerList from "src/maintainers/MaintainerList";

interface Props {
  entity: Entity;
}

const Maintainers = ({ entity }: Props) => {
  const { data: maintainers } = useQuery(
    ["entities", entity.hash, "maintainers"],
    () => fetchEntityMaintainers(entity)
  );

  return (
    <>
      <FormattedMessage tagName="h2" {...messages.maintainersHeading} />
      <MaintainerList maintainers={maintainers} />
    </>
  );
};

export default Maintainers;
