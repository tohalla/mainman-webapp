import { snakeCase, camelCase } from "change-case";
import { map } from "ramda";

import { indexByProp } from "../misc";
import { transformKeys } from "../transform";

export type ApiMethods = "GET" | "POST" | "PUT" | "PATCH" | "UPDATE" | "DELETE";
export type QueryParamType = string | number | boolean | undefined;
interface ApiCallOptions<K, R> {
  key?: K;
  responseType?: R;
}

const host = process.env.NODE_ENV === "development" ? "localhost" : "backend";
const apiVer = "v1";

export const apiURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.API_PROTOCOL ?? "http"}://${host}:8080/api/${apiVer}`
    : `https://${host}/api/${apiVer}`;

export const getApiCall = <
  T extends { [key: string]: unknown },
  U extends T | { [key: string]: T } = T,
  V = Partial<U>
>(
  path: string,
  config: {
    body?: V;
    headers?: RequestInit["headers"];
    method?: ApiMethods;
  } = {}
) => async <K extends keyof T | undefined, R extends "json" | "text" | null>({
  responseType = "json",
  key,
}: ApiCallOptions<K, R> = {}): Promise<R extends string ? U : Response> => {
  const res = await fetch(
    `${apiURL}${path.endsWith("/") ? path.slice(0, -1) : path}`,
    {
      method: config.method ?? "GET",
      body: config.body
        ? JSON.stringify(transformKeys(snakeCase)(config.body))
        : undefined,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(config.headers ?? {}),
      },
    }
  );

  if (!res.ok) {
    throw res;
  }

  if (responseType === null) {
    return res as R extends string ? U : Response;
  }

  const { data: payload } = await res[responseType]();
  return transformKeys<U>(camelCase)(
    ((key && Array.isArray(payload)
      ? indexByProp<T>(key as NonNullable<K>)(payload)
      : payload) as unknown) as U
  ) as R extends string ? U : Response;
};

const callApi = (...args: Parameters<typeof getApiCall>) =>
  getApiCall(...args)({ responseType: null });

const formatQueryParams = (key: string) => (value: QueryParamType) =>
  `${key}=${String(value)}`;

export const formatQuery = (
  query?: Record<string, QueryParamType[] | QueryParamType>
) => {
  if (!query) return "";

  const q = map(
    (key) => {
      if (Array.isArray(query[key])) {
        return map(formatQueryParams(key), query[key] as []).join("&");
      }
      return formatQueryParams(key)(String(query[key]));
    },
    Object.keys(query).filter((key) => typeof query[key] !== "undefined")
  );
  return q.length === 0 ? "" : `?${q.join("&")}`;
};

export default callApi;
