import type { Entity } from "src/entities";
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
  processedAt?: string;
}

export interface MaintenanceEvent {
  id: number;
  createdAt: string;
  updatedAt?: string;
  resolvedAt?: string;
  description?: string;
  maintenanceRequest?: number;
  entity: string;
}

export const fetchMaintenanceTrigger = (uuid: string) =>
  getApiCall<MaintenanceTrigger>(`/maintenance/triggers/${uuid}`)({
    key: "uuid",
    responseType: "json",
  });

export const createMaintenanceRequest = (
  maintenanceRequest: Required<
    Creatable<Omit<MaintenanceRequest, "processedAt">>
  >
) =>
  getApiCall<MaintenanceRequest>(
    `/maintenance/triggers/${maintenanceRequest.maintenanceTrigger}`,
    { method: "POST", body: maintenanceRequest }
  )({ key: "id", responseType: "json" });

export const maintenanceTriggerKey = (uuid: string) => [
  "maintenance/triggers",
  uuid,
];

export const fetchMaintenanceRequestTemplate = (uuid: string) =>
  getApiCall(`/maintenance/triggers/${uuid}/template`)({
    responseType: "text",
  });

export const maintenanceRequestTemplateKey = (uuid: string) => [
  "maintenance/triggers",
  uuid,
  "template",
];

export const createMaintenanceEvent = (
  entity: Entity,
  payload: Creatable<MaintenanceEvent>
) =>
  getApiCall<MaintenanceEvent>(
    `/organisations/${entity.organisation}/entities/${entity.uuid}/maintenance/events`,
    { method: "POST", body: payload }
  )({ key: "id", responseType: "json" });

export const maintenanceEventsKey = (id: number) => ["maintenance/events", id];
