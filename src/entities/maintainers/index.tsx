import { differenceWith, eqProps } from "ramda";
import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { addMaintainer, Entity, entityMaintainersKey } from "..";

import messages from "./messages";

import Lookup from "src/general/Lookup";
import {
  fetchMaintainersByEntity,
  Maintainer,
  maintainerAsString,
  useMaintainers,
} from "src/maintainers";
import MaintainerList from "src/maintainers/MaintainerList";
import OrganisationContext from "src/organisation/OrganisationContext";

interface Props {
  entity: Entity;
}

const Maintainers = ({ entity }: Props) => {
  const queryClient = useQueryClient();
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: maintainers } = useMaintainers(activeOrganisation);
  const { data: entityMaintainers } = useQuery(
    entityMaintainersKey(entity.hash),
    () => fetchMaintainersByEntity(entity)
  );
  const { mutate } = useMutation(
    (maintainer: Maintainer) => addMaintainer(entity, maintainer),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(entityMaintainersKey(entity.hash)),
    }
  );

  return (
    <>
      <FormattedMessage tagName="h2" {...messages.maintainersHeading} />
      <MaintainerList maintainers={entityMaintainers} />
      {maintainers && (
        <Lookup
          filterPredicate={(query) => ({ details }: Maintainer) =>
            Boolean(
              (details?.email && details.email.includes(query)) ||
                (details?.name && details.name.includes(query))
            )}
          items={differenceWith(
            eqProps("id"),
            Object.values(maintainers),
            Object.values(entityMaintainers ?? {})
          )}
          itemToString={maintainerAsString}
          label={<FormattedMessage {...messages.addMaintainerLabel} />}
          onChange={(maintainer) => {
            if (maintainer) {
              mutate(maintainer);
            }
          }}
          renderItem={maintainerAsString}
          value={null}
        />
      )}
    </>
  );
};

export default Maintainers;
