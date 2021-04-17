import { useEffect } from "react";
import { useQuery } from "react-query";

import { getApiCall } from "../util/api";

import type { Entity } from "src/entities";
import { Timestamps } from "src/general";
import { Organisation } from "src/organisation";

export interface MaintainerDetails {
  [key: string]: unknown;
  name?: string;
  email?: string;
}

export type Maintainer = Timestamps & {
  id: number;
  details?: MaintainerDetails;
  organisation: number;
};

export const fetchMaintainer = (organisation?: number, id?: number) =>
  typeof organisation === "undefined" || typeof id === "undefined"
    ? Promise.reject()
    : getApiCall<Maintainer>(
        `/organisations/${organisation}/maintainers/${id}`
      )({
        responseType: "json",
        key: "id",
      });

export const fetchMaintainers = (organisation: number) =>
  getApiCall<Maintainer, Record<string, Maintainer>>(
    `/organisations/${organisation}/maintainers`
  )({ key: "id", responseType: "json" });

export const fetchMaintainersByEntity = (entity: Entity) =>
  getApiCall<Maintainer, Record<string, Maintainer>>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintainers`
  )({ key: "id", responseType: "json" });

export const createMaintainer = ({
  organisation,
  ...payload
}: Omit<Maintainer, "uuid" | keyof Timestamps>) =>
  getApiCall<Maintainer, Maintainer>(
    `/organisations/${organisation}/maintainers`,
    {
      method: "POST",
      body: payload,
    }
  )({ key: "id", responseType: "json" });

export const updateMaintainer = ({
  organisation,
  id,
  ...payload
}: Omit<Maintainer, keyof Timestamps>) =>
  getApiCall<Maintainer, Maintainer>(
    `/organisations/${organisation}/maintainers/${id}`,
    {
      method: "PATCH",
      body: payload,
    }
  )({ key: "id", responseType: "json" });

export const useMaintainers = (organisation?: Organisation) => {
  const q = useQuery(
    maintainersKey,
    () => organisation && fetchMaintainers(organisation?.id),
    { enabled: typeof organisation !== "undefined" }
  );
  useEffect(() => {
    void q.refetch();
  }, [organisation]);
  return q;
};

export const maintainerAsString = ({ details, id }: Maintainer) =>
  details?.name ?? details?.email ?? String(id);

export const maintainersKey = "maintainers";

export const maintainerKey = (maintainer?: number) => [
  maintainerKey,
  maintainer,
];

export const maintainerEntitiesKey = (maintainer?: number) => [
  "maintainers",
  maintainer,
  "entities",
];
