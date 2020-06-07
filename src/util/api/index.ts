import { pick, map, curry } from "ramda";

import { ServerContext } from "../../../server";

export type APIMethods = "GET" | "POST" | "PUT" | "PATCH" | "UPDATE" | "DELETE";
export type QueryParamType = string | number | boolean | undefined;
export type CallContext = ServerContext;

const host = process.env.NODE_ENV === "development" ? "backend" : "localhost";
const apiVer = "v1";

export const apiURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.API_PROTOCOL ?? "http"}://${host}:8080/api/${apiVer}`
    : `https://${host}/api/${apiVer}`;

const callApi = (
  path: string,
  config: {
    body?: Record<string, unknown>;
    headers?: RequestInit["headers"];
    method?: APIMethods;
    ctx?: CallContext;
  } = {}
): Promise<Response> =>
  fetch(`${apiURL}${path.endsWith("/") ? path.slice(0, -1) : path}`, {
    method: config.method ?? "GET",
    body: config.body ? JSON.stringify(config.body) : undefined,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(config.headers ?? {}),
      ...pick(["cookie"], config.ctx?.req?.headers ?? {}),
    },
  }).then((response) => {
    if (response.ok) {
      return response;
    }
    throw response;
  });

const formatQueryParams = curry(
  (key: string, value: QueryParamType) => `${key}=${String(value)}`
);

export const formatQuery = (
  query?: Record<string, QueryParamType[] | QueryParamType>
) => {
  if (!query) return "";

  const q = map(
    (key) => {
      if (Array.isArray(query[key])) {
        return map(formatQueryParams(key), query[key] as []).join("&");
      }
      return formatQueryParams(key, query[key] as string);
    },
    Object.keys(query).filter((key) => typeof query[key] !== "undefined")
  );
  return q.length === 0 ? "" : `?${q.join("&")}`;
};

export default callApi;
