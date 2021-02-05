import { differenceWith, dissoc, eqProps } from "ramda";
import React, { useContext, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CellProps } from "react-table";
import { Box } from "theme-ui";

import {
  addMaintainer,
  Entity,
  entityMaintainersKey,
  removeMaintainer,
} from "..";

import messages from "./messages";

import PlainButton from "src/general/Button/PlainButton";
import Lookup from "src/general/Lookup";
import {
  fetchMaintainersByEntity,
  Maintainer,
  maintainerAsString,
  maintainerEntitiesKey,
  useMaintainers,
} from "src/maintainers";
import MaintainerList, { defaultColumns } from "src/maintainers/MaintainerList";
import OrganisationContext from "src/organisation/OrganisationContext";

interface Props {
  entity: Entity;
}

const Maintainers = ({ entity }: Props) => {
  const queryClient = useQueryClient();
  const { activeOrganisation } = useContext(OrganisationContext);
  const { data: maintainers } = useMaintainers(activeOrganisation);
  const { data: entityMaintainers } = useQuery(
    entityMaintainersKey(entity.uuid),
    () => fetchMaintainersByEntity(entity)
  );
  const { mutate: add } = useMutation(
    (maintainer: Maintainer) => addMaintainer(entity, maintainer),
    {
      onSuccess: (_, maintainer) => {
        void queryClient.invalidateQueries(entityMaintainersKey(entity.uuid));
        void queryClient.invalidateQueries(
          maintainerEntitiesKey(maintainer.id)
        );
      },
    }
  );
  const { mutate: remove } = useMutation(
    (maintainer: Maintainer) => removeMaintainer(entity, maintainer),
    {
      onSuccess: (_, maintainer) => {
        queryClient.setQueryData(
          entityMaintainersKey(entity.uuid),
          dissoc(String(maintainer.id))
        );
        queryClient.setQueryData(
          maintainerEntitiesKey(maintainer.id),
          dissoc(entity.uuid)
        );
      },
    }
  );

  const columns = useMemo(
    () => [
      ...defaultColumns,
      {
        id: "actions",
        Header: <FormattedMessage {...messages.colActions} />,
        Cell: ({ row: { original } }: CellProps<Maintainer>) => (
          <PlainButton onClick={() => remove(original)}>
            <FormattedMessage {...messages.actionRemoveMaintainer} />
          </PlainButton>
        ),
      },
    ],
    [remove]
  );

  return (
    <>
      <MaintainerList columns={columns} maintainers={entityMaintainers} />
      <Box mt="default">
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
                add(maintainer);
              }
            }}
            renderItem={maintainerAsString}
            value={null}
          />
        )}
      </Box>
    </>
  );
};

export default Maintainers;
