import { getApiCall } from "src/util/api";

export interface MaintenanceTrigger {
  createdAt: string;
  uuid: string;
  entity: string;
}

export interface MaintenanceRequest {
  createdAt: string;
  createdBy?: number;
  description?: string;
  id: number;
  maintenanceTrigger?: string;
}

export const fetchMaintenanceTrigger = (uuid: string) =>
  getApiCall<MaintenanceTrigger>(`/maintenance/${uuid}`)({
    key: "uuid",
    responseType: "json",
  });

export const createMaintenanceRequest = (
  maintenanceRequest: Required<Creatable<MaintenanceRequest>>
) =>
  getApiCall<MaintenanceRequest>(
    `/maintenance/${maintenanceRequest.maintenanceTrigger}`,
    { method: "POST", body: maintenanceRequest }
  )({ key: "id", responseType: "json" });

export const maintenanceTriggerKey = (uuid: string) => [
  "maintenance/triggers",
  uuid,
];

export const fetchMaintenanceRequestTemplate = (uuid: string) =>
  getApiCall(`/maintenance/${uuid}/template`)({
    responseType: "text",
  });

export const maintenanceRequestTemplateKey = (uuid: string) => [
  "maintenance/triggers",
  uuid,
  "template",
];
