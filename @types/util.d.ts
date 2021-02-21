declare type Creatable<T, OmitAdditional extends keyof T = undefined> = Omit<
  T,
  "createdAt" | "updatedAt" | "createdBy" | "id" | "uuid" | OmitAdditional
>;
