import { getApiCall } from "../util/api";

export interface Plan {
  id: number;
  name: string;
  entities: number;
  maintainers: number;
  accounts: number;
  stripePrice?: {
    unitAmount: number;
    currency: string;
  };
}

export interface Organisation {
  id: number;
  name: string;
  organisationIdentifier?: string;
  locale: string;
  adminAccount: number;
  plan: number;
}

export const fetchPlans = () =>
  getApiCall<Plan, Record<string, Plan>>(`/plans/`)({
    responseType: "json",
    key: "id",
  });

export const fetchOrganisation = (id: number) =>
  getApiCall<Organisation, Organisation>(`/organisations/${id}`)({
    key: "id",
    responseType: "json",
  });

export const fetchOrganisations = () =>
  getApiCall<Organisation, Record<string, Organisation>>("/organisations")({
    key: "id",
    responseType: "json",
  });

export const createOrganisation = (
  payload: Omit<Organisation, "adminAccount" | "id">
) =>
  getApiCall<Organisation, Organisation>("/organisations", {
    method: "POST",
    body: payload,
  })({ key: "id", responseType: "json" });

export const updateOrganisation = ({
  id,
  ...payload
}: Omit<Organisation, "adminAccount">) =>
  getApiCall<Organisation, Organisation>(`/organisations/${id}`, {
    method: "PATCH",
    body: payload,
  })({ key: "id", responseType: "json" });

export const organisationsKey = "organisations";

export const organisationKey = (organisation?: number) => [
  "organisations",
  organisation,
];

export const plansKey = "plans";
