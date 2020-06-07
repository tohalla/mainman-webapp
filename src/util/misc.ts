import { indexBy } from "ramda";

export const indexByProp = <T extends Record<string, unknown>>(
  prop: keyof T
) => (payload: T[]): Record<string, T> =>
  Array.isArray(payload)
    ? indexBy((obj) => String(obj[prop]), payload)
    : payload;
