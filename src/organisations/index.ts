import { getApiCall } from "../util/api";

export type Organisation = {
  id: number;
  name: string;
  organisationIdentifier?: string;
  locale: string;
  adminAccount: number;
};

export const fetchOrganisation = (_: string, id: number) =>
  getApiCall<Organisation, Organisation>(`/organisations/${id}`)({
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
  })({ responseType: "json" });

export const updateOrganisation = ({
  id,
  ...payload
}: Omit<Organisation, "adminAccount">) =>
  getApiCall<Organisation, Organisation>(`/organisations/${id}`, {
    method: "PATCH",
    body: payload,
  })({ responseType: "json" });
