declare type Creatable<T, OmitAdditional extends keyof T = undefined> = Omit<
  T,
  "createdAt" | "updatedAt" | "id" | "uuid" | OmitAdditional
>;
