import { getApiCall } from "../util/api";

import { Timestamps } from "src/general";

export type Appliance = Timestamps & {
  hash: string;
  name: string;
  description?: string;
  organisation: number;
};

const queryOpts = { key: "hash" as const, responseType: "json" as const };

export const fetchAppliance = (organisation: number, hash: string) =>
  getApiCall<Appliance>(`/organisations/${organisation}/appliances/${hash}`)(
    queryOpts
  );

export const fetchAppliances = (organisation: number) =>
  getApiCall<Appliance, Record<string, Appliance>>(
    `/organisations/${organisation}/appliances`
  )(queryOpts);

export const createAppliance = ({
  organisation,
  ...payload
}: Omit<Appliance, "hash" | keyof Timestamps>) =>
  getApiCall<Appliance, Appliance>(
    `/organisations/${organisation}/appliances`,
    {
      method: "POST",
      body: payload,
    }
  )(queryOpts);

export const updateAppliance = ({
  organisation,
  hash,
  ...payload
}: Omit<Appliance, keyof Timestamps>) =>
  getApiCall<Appliance, Appliance>(
    `/organisations/${organisation}/appliances/${hash}`,
    {
      method: "PATCH",
      body: payload,
    }
  )(queryOpts);
