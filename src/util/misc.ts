import { indexBy } from "ramda";

export const indexByProp = <T>(prop: keyof T) => (
  payload: T[]
): Record<string, T> =>
  Array.isArray(payload)
    ? indexBy((obj) => String(obj[prop]), payload)
    : payload;
