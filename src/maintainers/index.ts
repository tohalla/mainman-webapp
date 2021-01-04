import { getApiCall } from "../util/api";

import { Timestamps } from "src/general";

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
  });

export const fetchMaintainers = (organisation: number) =>
  getApiCall<Maintainer, Record<string, Maintainer>>(
    `/organisations/${organisation}/maintainers`
  )({ responseType: "json" });

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
  )({ responseType: "json" });

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
  )({ responseType: "json" });
