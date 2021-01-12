export const transformKeys = <T>(
  fn: (s: string) => string,
  obj: T
): unknown => {
  if (Array.isArray(obj)) {
    return obj.map((val) => transformKeys(fn, val));
  }
  if (obj && typeof obj === "object") {
    Object.entries(obj).map(([key, val]) => [fn(key), val]);
  }
  return obj;
};
