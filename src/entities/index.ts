import { useEffect } from "react";
import { useQuery } from "react-query";

import callApi, { getApiCall } from "../util/api";

import type { Timestamps } from "src/general";
import type { Maintainer } from "src/maintainers";
import {
  MaintenanceEvent,
  MaintenanceRequest,
  MaintenanceTrigger,
} from "src/maintenance";
import { Organisation } from "src/organisation";

export interface Entity extends Timestamps {
  uuid: string;
  name: string;
  description?: string;
  organisation: number;
  pendingRequests?: number;
  unfinishedEvents?: number;
  finishedEvents?: number;
}

const queryOpts = { key: "uuid" as const, responseType: "json" as const };

export const fetchEntity = (organisation?: number, uuid?: string) =>
  typeof organisation === "undefined" || typeof uuid === "undefined"
    ? Promise.reject()
    : getApiCall<Entity>(`/organisations/${organisation}/entities/${uuid}`)(
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

export const useEntities = (organisation?: Organisation) => {
  const q = useQuery(
    entitiesKey,
    () => organisation && fetchEntities(organisation?.id),
    { enabled: typeof organisation !== "undefined" }
  );
  useEffect(() => {
    void q.refetch();
  }, [organisation]);
  return q;
};

export const entitiesKey = "entities";

export const entityKey = (entity?: string) => [entitiesKey, entity];

// maintenance

export const fetchMaintenanceTriggers = (entity: Entity) =>
  getApiCall<MaintenanceTrigger, Record<string, MaintenanceTrigger>>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintenance/triggers`,
    { method: "GET" }
  )(queryOpts);

export const fetchMaintenanceRequests = (entity: Entity) =>
  getApiCall<MaintenanceRequest, Record<string, MaintenanceRequest>>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintenance/requests`,
    { method: "GET", query: { processed: false } }
  )({ responseType: "json", key: "id" });

export const fetchMaintenanceEvents = (entity: Entity) =>
  getApiCall<MaintenanceEvent, Record<string, MaintenanceEvent>>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintenance/events`,
    { method: "GET", query: { resolved: false } }
  )({ responseType: "json", key: "id" });

export const createMaintenanceTrigger = (entity: Entity) =>
  getApiCall<MaintenanceTrigger>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintenance/triggers`,
    { method: "POST" }
  )(queryOpts);

export const deleteMaintenanceTrigger = ({
  entity,
  maintenanceTrigger: { uuid },
}: {
  entity: Entity;
  maintenanceTrigger: MaintenanceTrigger;
}) =>
  callApi(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintenance/triggers/${uuid}`,
    { method: "DELETE" }
  );

export const maintenanceRequestsKey = (entity: string) => [
  ...entityKey(entity),
  "maintenance",
  "requests",
];

export const maintenanceTriggersKey = (entity: string) => [
  ...entityKey(entity),
  "maintenance",
  "triggers",
];

export const maintenanceEventsKey = (entity: string) => [
  ...entityKey(entity),
  "maintenance",
  "events",
];

export const addMaintainer = (entity: Entity, maintainer: Maintainer) =>
  getApiCall<Entity, Entity>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintainers`,
    {
      method: "POST",
      body: [maintainer.id],
    }
  )(queryOpts);

export const removeMaintainer = (entity: Entity, maintainer: Maintainer) =>
  callApi(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintainers`,
    {
      method: "DELETE",
      body: [maintainer.id],
    }
  );

export const entityMaintainersKey = (entity?: string) => [
  "entities",
  entity,
  "maintainers",
];
