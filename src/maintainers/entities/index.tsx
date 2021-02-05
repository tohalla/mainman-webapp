import React from "react";
import { useQuery } from "react-query";

import { Maintainer, maintainerEntitiesKey } from "..";

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
      <EntityList entities={entities} />
    </>
  );
};

export default Entities;
