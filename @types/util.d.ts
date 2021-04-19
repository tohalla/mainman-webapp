declare type Creatable<T, OmitAdditional extends keyof T = undefined> = Omit<
  T,
  "createdAt" | "updatedAt" | "createdBy" | "id" | "uuid" | OmitAdditional
>;

type CamelizeString<T extends PropertyKey> = T extends string
  ? string extends T
    ? string
    : T extends `${infer F}_${infer R}`
    ? `${F}${Capitalize<CamelizeString<R>>}`
    : T
  : T;

// eslint-disable-next-line @typescript-eslint/ban-types
declare type Camelize<T> = T extends object
  ? { [K in keyof T as CamelizeString<K>]: Camelize<T[K]> }
  : T;
