import { snakeCase, camelCase } from "change-case";
import { map, pick } from "ramda";

import { ServerContext } from "../../../server";
import { indexByProp } from "../misc";
import { transformKeys } from "../transform";

export type ApiMethods = "GET" | "POST" | "PUT" | "PATCH" | "UPDATE" | "DELETE";
export type QueryParamType = string | number | boolean | undefined;

const host = process.env.NODE_ENV === "development" ? "localhost" : "backend";
const apiVer = "v1";

export const apiURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.API_PROTOCOL ?? "http"}://${host}:8080/api/${apiVer}`
    : `https://${host}/api/${apiVer}`;

export const getApiCall = <
  T extends Record<string, unknown>,
  U = T | Record<string, T>
>(
  path: string,
  config: {
    body?: Record<string, unknown>;
    headers?: RequestInit["headers"];
    method?: ApiMethods;
  } = {},
  options?: { ctx?: ServerContext }
) => <K extends keyof T | undefined>({
  responseType,
  key,
}: {
  key?: K;
  responseType?: "json" | "text";
} = {}) =>
  fetch(`${apiURL}${path.endsWith("/") ? path.slice(0, -1) : path}`, {
    method: config.method ?? "GET",
    body: config.body
      ? JSON.stringify(transformKeys(snakeCase)(config.body))
      : undefined,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...pick(["cookie"], options?.ctx?.req?.headers ?? {}),
      ...(config.headers ?? {}),
    },
  })
    .then((response) => {
      if (response.ok) {
        return responseType ? response[responseType]() : responseType;
      }
      throw response;
    })
    .then((payload: T) =>
      transformKeys<U>(camelCase)(
        ((key && Array.isArray(payload)
          ? indexByProp<T>(key as NonNullable<K>)(payload)
          : payload) as unknown) as U
      )
    );

const callApi = (...args: Parameters<typeof getApiCall>) =>
  getApiCall(...args)();

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
