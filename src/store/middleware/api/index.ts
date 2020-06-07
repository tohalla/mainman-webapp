import { AnyAction, Middleware } from "@reduxjs/toolkit";
import { indexBy, compose, prop } from "ramda";

import callApi, { formatQuery } from "../../../util/api";

import {
  ApiCall,
  CALL_API,
  ApiResponseAction,
  CALL_API_SUCCESS,
  CALL_API_FAILURE,
} from "./reducer";

export const isValid = (action: AnyAction): action is ApiCall =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof action.request?.endpoint === "string" &&
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  typeof action.request?.method === "string";

const apiMiddleware: Middleware = ({ getState }) => (next) => async (
  action: AnyAction
) => {
  if (action.type !== CALL_API) {
    return next(action); // no need to continue if not an api call
  }
  if (!isValid(action)) {
    throw new Error(`Invalid api call ${JSON.stringify(action)}`);
  }

  const {
    attemptToFetchFromStore,
    onSuccess,
    onFailure,
    request,
    additionalPayload,
    idField = "id",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normalizeResponse = (response: any) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      Array.isArray(response)
        ? indexBy(compose(String, prop(idField)), response)
        : response,
    ctx,
  } = action;

  if (typeof attemptToFetchFromStore === "function") {
    const cached = attemptToFetchFromStore(getState());
    if (cached) {
      // trigger onSuccess if defined
      if (typeof onSuccess === "function") {
        await onSuccess(cached, true);
      }
      return cached;
    }
  }

  // dispatch action indicating request
  next<ApiResponseAction>({
    request,
    payload: { isFetching: true, requestedAt: Date.now() },
    type: CALL_API,
  });

  try {
    const response = await callApi(
      `${request.endpoint}${formatQuery(request.query)}`,
      {
        ...request,
        ctx,
      }
    );

    // pass set cookie (next)
    if (ctx && ctx.res && response.headers.has("Set-Cookie")) {
      ctx.res.setHeader("Set-Cookie", response.headers.get("Set-Cookie") ?? "");
    }
    if (!response.ok) {
      throw response;
    }

    let payload: unknown[] | Record<string, unknown> = additionalPayload ?? {};
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const responsePayload = normalizeResponse(await response.json());
      if (Array.isArray(responsePayload)) {
        payload = responsePayload;
      } else {
        Object.assign(payload, responsePayload ?? {});
      }
    } else if (contentType.includes("text")) {
      payload = { body: await response.text() };
    }

    // dispatch action indicating success
    next<ApiResponseAction>({
      request,
      type: CALL_API_SUCCESS,
    });
    if (typeof onSuccess === "function") {
      await onSuccess(payload, false);
    }

    return payload;
  } catch (error) {
    const responseError = new Error(
      // eslint-disable-line @typescript-eslint/no-unsafe-member-access
      error && typeof error === "object" && typeof error.text === "function"
        ? await error.text()
        : error
    );
    if (typeof onFailure === "function") {
      await onFailure(responseError);
    }

    // dispatch action indicating failure
    return next({
      request,
      payload: { isFetching: false, error: responseError },
      type: CALL_API_FAILURE,
    });
  }
};

export default apiMiddleware;
