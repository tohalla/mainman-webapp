import { useQuery } from "react-query";

import { getApiCall } from "../util/api";

import type { Entity } from "src/entities";
import { Timestamps } from "src/general";
import { Organisation } from "src/organisation";

export interface MaintainerDetails {
  name?: string;
  email?: string;
}

export type Maintainer = Timestamps & {
  id: number;
  details?: MaintainerDetails;
  organisation: number;
};

export const fetchMaintainer = (organisation: number, id: number) =>
  getApiCall<Maintainer>(`/organisations/${organisation}/maintainers/${id}`)({
    responseType: "json",
    key: "id",
  });

export const fetchMaintainers = (organisation: number) =>
  getApiCall<Maintainer, Record<string, Maintainer>>(
    `/organisations/${organisation}/maintainers`
  )({ key: "id", responseType: "json" });

export const fetchMaintainersByEntity = (entity: Entity) =>
  getApiCall<Maintainer, Record<string, Maintainer>>(
    `/organisations/${entity.organisation}/entities/${entity.hash}/maintainers`
  )({ key: "id", responseType: "json" });

export const createMaintainer = ({
  organisation,
  ...payload
}: Omit<Maintainer, "hash" | keyof Timestamps>) =>
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

export const useMaintainers = (organisation?: Organisation) =>
  useQuery(
    ["organisation", organisation?.id, "maintainers"],
    ({ queryKey: [_, organisationId] }) => fetchMaintainers(organisationId),
    { enabled: typeof organisation !== "undefined" }
  );

export const maintainerAsString = ({ details, id }: Maintainer) =>
  details?.name ?? details?.email ?? String(id);
