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
  entity: string;
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

export interface MaintenanceTask {
  uuid: string;
  createdAt: string;
  acceptedAt?: string;
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
  "maintenance",
  "triggers",
  uuid,
];

export const fetchMaintenanceRequestTemplate = (uuid: string) =>
  getApiCall(`/maintenance/triggers/${uuid}/template`)({
    responseType: "text",
  });

export const maintenanceRequestTemplateKey = (uuid: string) => [
  "maintenance",
  "triggers",
  uuid,
  "template",
];

export const fetchMaintenanceTaskTemplate = (uuid: string) =>
  getApiCall(`/maintenance/tasks/${uuid}/template`)({
    responseType: "text",
  });

export const maintenanceTaskTemplateKey = (uuid: string) => [
  ...maintenancTasksKey,
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

export const maintenanceEventsKey = ["maintenance", "events"];

export const submitMaintenanceReport = (task: MaintenanceTask) =>
  getApiCall<MaintenanceTask>(`/maintenance/tasks/${task.uuid}/resolve`, {
    method: "POST",
  })({ key: "uuid", responseType: "json" });

export const fetchMaintenanceTask = (uuid: string) =>
  getApiCall<MaintenanceTask>(`/maintenance/tasks/${uuid}`)({
    key: "uuid",
    responseType: "json",
  });

export const maintenancTasksKey = ["maintenance", "tasks"];
export const maintenancTaskKey = (uuid: string) => [
  "maintenance",
  "tasks",
  uuid,
];
