import { createReducer, Action } from "@reduxjs/toolkit";

import type { ApiMethods, QueryParamType } from "../../../util/api";
import type { State } from "../../reducer";

export const CALL_API = "CALL_API";
export const CALL_API_SUCCESS = "CALL_API_SUCCESS";
export const CALL_API_FAILURE = "CALL_API_FAILURE";

type ActionTypes =
  | typeof CALL_API
  | typeof CALL_API_SUCCESS
  | typeof CALL_API_FAILURE;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiCall<Payload = any> extends Action {
  type: typeof CALL_API;

  request: {
    query?: Record<string, QueryParamType[] | QueryParamType>;
    method?: ApiMethods;
    headers?: RequestInit["headers"];
    endpoint: string;
    body?: Record<string, unknown>;
  };

  handleHeaders?(headers: Headers): void;
  idField?: string;
  // data to send on success, will be merged with actual payload (if any)
  additionalPayload?: Record<string, unknown>;
  // get triggered on succesfull response
  onSuccess?(payload: Payload, cached: boolean): void | Promise<unknown>;
  // gets triggered if the request fails
  onFailure?(payload: Payload): void | Promise<unknown>;
  // read from redux store before fetching, if value present, won't call api
  attemptToFetchFromStore?(state: State): Record<string, Payload> | undefined;
  // writes returned object to the store
  normalizeResponse?(response: Payload[]): Record<string, Payload>;
}

export interface ApiResponsePayload {
  requestedAt: number;
  isFetching: boolean;
  error?: string;
}

export interface ApiResponseAction extends Action<ActionTypes> {
  payload?: ApiResponsePayload;
  request: ApiCall["request"];
}

export const reduxApiCall = ({
  request,
  ...args
}: Omit<ApiCall, "type">): ApiResponseAction => ({
  ...args,
  request: { ...request, method: request.method ?? "GET" },
  type: CALL_API,
});

const initialState: Record<
  ApiMethods,
  Record<string, undefined | ApiResponsePayload>
> = {
  DELETE: {},
  POST: {},
  GET: {},
  PATCH: {},
  UPDATE: {},
  PUT: {},
};

const updater = (
  draft: typeof initialState,
  { payload, request }: ApiResponseAction
) => {
  draft[request.method ?? "GET"][request.endpoint] = payload;
};

const requests = createReducer(initialState, {
  call: updater,
  callFailure: updater,
  callSuccess: (draft, { request }: ApiResponseAction) => {
    delete draft[request.method ?? "GET"][request.endpoint];
  },
});

export default requests;
