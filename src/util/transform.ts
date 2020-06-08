// eslint-disable-next-line @typescript-eslint/ban-types
export const transformKeys = <T>(fn: (s: string) => string) => (obj: T): T => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  const transform = transformKeys(fn);
  return (Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [
      fn(key),
      val && typeof val === "object"
        ? Array.isArray(val)
          ? val.map(transform)
          : transform(val)
        : val,
    ])
  ) as unknown) as T;
};
