import { getApiCall } from "../util/api";

import { Timestamps } from "src/general";
import { Maintainer } from "src/maintainers";

export type Entity = Timestamps & {
  hash: string;
  name: string;
  description?: string;
  organisation: number;
};

const queryOpts = { key: "hash" as const, responseType: "json" as const };

export const fetchEntity = (organisation: number, hash: string) =>
  getApiCall<Entity>(`/organisations/${organisation}/entities/${hash}`)(
    queryOpts
  );

export const fetchEntities = (organisation: number) =>
  getApiCall<Entity, Record<string, Entity>>(
    `/organisations/${organisation}/entities`
  )(queryOpts);

export const fetchEntityMaintainers = (entity: Entity) =>
  getApiCall<Maintainer, Record<string, Maintainer>>(
    `/organisations/${entity.organisation}/entities/${entity.hash}/maintainers`
  )({ responseType: "json" });

export const createEntity = ({
  organisation,
  ...payload
}: Omit<Entity, "hash" | keyof Timestamps>) =>
  getApiCall<Entity, Entity>(`/organisations/${organisation}/entities`, {
    method: "POST",
    body: payload,
  })(queryOpts);

export const updateEntity = ({
  organisation,
  hash,
  ...payload
}: Omit<Entity, keyof Timestamps>) =>
  getApiCall<Entity, Entity>(
    `/organisations/${organisation}/entities/${hash}`,
    {
      method: "PATCH",
      body: payload,
    }
  )(queryOpts);
