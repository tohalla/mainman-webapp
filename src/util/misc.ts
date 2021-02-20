import { indexBy } from "ramda";

import type { APIError } from "./api";

export const indexByProp = <T>(prop: keyof T) => (
  payload: T[]
): Record<string, T> =>
  Array.isArray(payload)
    ? indexBy((obj) => String(obj[prop]), payload)
    : payload;

export const mapErrors = ({ errors }: APIError) => {
  const sources: Record<string, string> = {};
  const other: string[] = [];
  errors.forEach((error) => {
    if (error.source) {
      sources[error.source] = error.detail ?? "";
    } else if (error.detail) {
      other.push(error.detail);
    }
  });
  return [sources, other] as const;
};
