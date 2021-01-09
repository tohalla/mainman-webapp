export const transformKeys = <T>(
  fn: (s: string) => string,
  obj: T
): unknown[] | Record<string, unknown> => {
  if (Array.isArray(obj)) {
    return obj.map((val) => transformKeys(fn, val));
  }
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [fn(key), val])
  );
};
