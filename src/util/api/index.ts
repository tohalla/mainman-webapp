import { snakeCase, camelCase } from "change-case";
import { map } from "ramda";

import { parseCookieHeader } from "../cookie";
import { indexByProp } from "../misc";
import { transformKeys } from "../transform";

export type ApiMethods = "GET" | "POST" | "PUT" | "PATCH" | "UPDATE" | "DELETE";
export type QueryParamType = string | number | boolean | undefined;
export type SetHeader = (
  name: string,
  value: number | string | string[]
) => void;

interface ApiCallOptions<K, R> {
  key: K | null;
  responseType?: R;
  setHeader?: SetHeader;
}

const host = process.env.NODE_ENV === "development" ? "localhost" : "backend";
const apiVer = "v1";

export const apiURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.API_PROTOCOL ?? "http"}://${host}:8080`
    : `https://${host}`;

export const getApiCall = <
  T,
  U extends T | { [key: string]: T } = T,
  V = unknown
>(
  path: string,
  config: {
    body?: V;
    headers?: RequestInit["headers"];
    method?: ApiMethods;
  } = {}
) => async <K extends keyof T, R extends "json" | "text" | null>({
  responseType = "json",
  key,
  setHeader,
}: ApiCallOptions<K, R>): Promise<R extends string ? U : Response> => {
  const res = await fetch(
    `${apiURL}/api/${apiVer}${path.endsWith("/") ? path.slice(0, -1) : path}`,
    {
      method: config.method ?? "GET",
      body: config.body
        ? JSON.stringify(transformKeys(snakeCase, config.body))
        : undefined,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(config.headers ?? {}),
      },
    }
  );

  if (res.headers.has("Set-Cookie")) {
    setHeader?.(
      "Set-Cookie",
      parseCookieHeader(res.headers.get("Set-Cookie") ?? "")
    );
  }

  if (!res.ok) {
    throw res;
  }

  if (responseType === null) {
    return res as R extends string ? U : Response;
  }

  const { data: payload } = await res[responseType]();
  return transformKeys<U>(
    (input) =>
      // need for custom opts as e.g. uuids are used as keys
      camelCase(input, {
        splitRegexp: /([a-z])_([a-zA-Z0-9])/g,
        stripRegexp: /[^A-Z0-9-]/gi,
      }),
    key && Array.isArray(payload) ? indexByProp<T>(key)(payload) : payload
  ) as R extends string ? U : Response;
};

const callApi = (...args: Parameters<typeof getApiCall>) =>
  getApiCall(...args)({ responseType: null, key: null });

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
