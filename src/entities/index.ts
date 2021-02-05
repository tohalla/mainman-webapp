import { useQuery } from "react-query";

import callApi, { getApiCall } from "../util/api";

import type { Timestamps } from "src/general";
import type { Maintainer } from "src/maintainers";
import { Organisation } from "src/organisation";

export interface Entity extends Timestamps {
  uuid: string;
  name: string;
  description?: string;
  organisation: number;
}

export interface MaintenanceTrigger {
  uuid: string;
  entity: string;
}

const queryOpts = { key: "uuid" as const, responseType: "json" as const };

export const fetchEntity = (organisation: number, uuid: string) =>
  getApiCall<Entity>(`/organisations/${organisation}/entities/${uuid}`)(
    queryOpts
  );

export const fetchEntities = (organisation: number) =>
  getApiCall<Entity, Record<string, Entity>>(
    `/organisations/${organisation}/entities`
  )(queryOpts);

export const fetchEntitiesByMaintainer = (maintainer: Maintainer) =>
  getApiCall<Entity, Record<string, Entity>>(
    `/organisations/${maintainer.organisation}/maintainers/${maintainer.id}/entities`
  )({ responseType: "json", key: "uuid" });

export const createEntity = ({
  organisation,
  ...payload
}: Omit<Entity, "uuid" | keyof Timestamps>) =>
  getApiCall<Entity, Entity>(`/organisations/${organisation}/entities`, {
    method: "POST",
    body: payload,
  })(queryOpts);

export const updateEntity = ({
  organisation,
  uuid,
  ...payload
}: Omit<Entity, keyof Timestamps>) =>
  getApiCall<Entity, Entity>(
    `/organisations/${organisation}/entities/${uuid}`,
    {
      method: "PATCH",
      body: payload,
    }
  )(queryOpts);

export const addMaintainer = (entity: Entity, maintainer: Maintainer) =>
  getApiCall<Entity, Entity>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintainers`,
    {
      method: "POST",
      body: [maintainer.id],
    }
  )(queryOpts);

export const createTrigger = (entity: Entity) =>
  getApiCall<MaintenanceTrigger>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintenance-triggers`,
    { method: "POST" }
  )(queryOpts);

export const removeMaintainer = (entity: Entity, maintainer: Maintainer) =>
  callApi(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintainers`,
    {
      method: "DELETE",
      body: [maintainer.id],
    }
  );

export const useEntities = (organisation?: Organisation) =>
  useQuery(
    organisationEntitiesKey(organisation?.id),
    ({ queryKey: [_, organisationId] }) => fetchEntities(organisationId),
    { enabled: typeof organisation !== "undefined" }
  );

export const organisationEntitiesKey = (organisation?: number) => [
  "organisation",
  organisation,
  "entities",
];

export const entityKey = (entity?: string) => ["entities", entity];

export const entityMaintainersKey = (entity?: string) => [
  "entities",
  entity,
  "maintainers",
];
