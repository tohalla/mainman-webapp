// eslint-disable-next-line @typescript-eslint/ban-types
type P = Record<string | number, unknown> | {} | unknown[];

export const transformKeys = <T>(fn: (s: string) => string) => (obj: P): T => {
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
