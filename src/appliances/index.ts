import { getApiCall } from "../util/api";

import { Timestamps } from "src/general";

export type Appliance = Timestamps & {
  hash: string;
  name: string;
  description?: string;
  organisation: number;
};

export const fetchAppliance = (_: string, organisation: number, id: number) =>
  getApiCall<Appliance, Appliance>(
    `/organisations/${organisation}/appliances/${id}`
  )({ key: "hash" });

export const fetchAppliances = (_: string, organisation: number) =>
  getApiCall<Appliance, Appliance>(
    `/organisations/${organisation}/appliances`
  )();

export const createAppliance = ({
  organisation,
  ...payload
}: Omit<Appliance, "hash" | keyof Timestamps>) =>
  getApiCall<Appliance, Appliance>(
    `/organisations/appliances/${organisation}`,
    {
      method: "POST",
      body: payload,
    }
  )();

export const updateAppliance = ({
  organisation,
  ...payload
}: Omit<Appliance, "hash" | keyof Timestamps>) =>
  getApiCall<Appliance, Appliance>(
    `/organisations/appliances/${organisation}`,
    {
      method: "PATCH",
      body: payload,
    }
  )();
