import React from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import { Maintainer, maintainerEntitiesKey } from "..";

import messages from "./messages";

import { fetchEntitiesByMaintainer } from "src/entities";
import EntityList from "src/entities/EntityList";

interface Props {
  maintainer: Maintainer;
}

const Entities = ({ maintainer }: Props) => {
  const { data: entities } = useQuery(
    maintainerEntitiesKey(maintainer.id),
    () => fetchEntitiesByMaintainer(maintainer)
  );

  return (
    <>
      <FormattedMessage tagName="h2" {...messages.entitiesHeadings} />
      <EntityList entities={entities} />
    </>
  );
};

export default Entities;
