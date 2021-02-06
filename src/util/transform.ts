import { isObject } from "formik";

export const transformKeys = <T>(
  fn: (s: string) => string,
  obj: T
): unknown => {
  if (Array.isArray(obj)) {
    return obj.map((val) => transformKeys(fn, val));
  }
  if (isObject(obj)) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, val]) => [fn(key), transformKeys(fn, val)])
    );
  }
  return obj;
};
