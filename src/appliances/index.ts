import { getApiCall } from "../util/api";

import { Timestamps } from "src/general";

export type Appliance = Timestamps & {
  hash: string;
  name: string;
  description?: string;
  organisation: number;
};

interface QueryContext {
  organisation?: number;
}

export const fetchAppliance = (
  _: string,
  id: number,
  { organisation }: QueryContext
) =>
  getApiCall<Appliance, Appliance>(
    `/organisations/${organisation ?? ""}/appliances/${id}`
  )({ key: "hash" });

export const fetchAppliances = (_: string, { organisation }: QueryContext) =>
  getApiCall<Appliance, Record<string, Appliance>>(
    `/organisations/${organisation ?? ""}/appliances`
  )();

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
  )();

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
  )();
