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

interface QueryContext {
  id?: string;
  organisation?: number;
}

export const fetchMaintainer = (_: string, { id }: QueryContext) =>
  getApiCall<Maintainer>(`/maintainers/${id ?? ""}`)();

export const fetchMaintainers = (_: string, { organisation }: QueryContext) =>
  getApiCall<Maintainer, Record<string, Maintainer>>(
    `/organisations/${organisation ?? ""}/maintainers`
  )();

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
  )();

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
  )();
