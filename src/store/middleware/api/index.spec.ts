import fetchMock from "fetch-mock";
import { path, assocPath } from "ramda";
import configureMockStore from "redux-mock-store";

import { middleware, ThunkDispatch } from "../..";
import { apiURL } from "../../../util/api";

import {
  CALL_API,
  CALL_API_FAILURE,
  ApiCall,
  CALL_API_SUCCESS,
} from "./reducer";

describe("API middleware", () => {
  const initialState = {
    entities: {
      test: 1,
    },
  };
  const mockStore = configureMockStore<typeof initialState, ThunkDispatch>(
    middleware
  );

  const action: ApiCall = {
    request: {
      endpoint: "/test",
      method: "GET",
    },
    type: CALL_API,
  };

  const response = [
    { id: 1, name: "a" },
    { id: 3, name: "c" },
  ];

  const store = mockStore(initialState);

  beforeEach(() => {
    store.clearActions();
    fetchMock.reset();
  });

  it("should call api with requested method", async () => {
    fetchMock.put(`${apiURL}/test`, response);
    await store.dispatch(assocPath(["request", "method"], "PUT", action));
    expect(fetchMock.calls(undefined, { method: "PUT" }).length).toBe(1);
  });

  it("successful api call should fire expected actions", async () => {
    fetchMock.get(`${apiURL}/test`, response);
    await store.dispatch(action);
    expect(store.getActions()).toEqual([
      {
        request: action.request,
        payload: {
          isFetching: true,
          requestedAt: path([0, "payload", "requestedAt"], store.getActions()),
        },
        type: CALL_API,
      },
      {
        type: CALL_API_SUCCESS,
        request: action.request,
      },
    ]);
  });

  it("faulty api call should fire expected actions", async () => {
    fetchMock.get(`${apiURL}/faulty`, 404);
    expect(
      await store.dispatch(
        assocPath(["request", "endpoint"], "/faulty", action)
      )
    ).toThrow();
    expect(store.getActions()).toEqual([
      {
        request: {
          endpoint: "/faulty",
          method: action.request.method,
        },
        payload: {
          isFetching: true,
          requestedAt: path([0, "payload", "requestedAt"], store.getActions()),
        },
        type: CALL_API,
      },
      {
        request: {
          endpoint: "/faulty",
          method: action.request.method,
        },
        payload: {
          isFetching: false,
          error: new Error("Error: Network Error"),
        },
        type: CALL_API_FAILURE,
      },
    ]);
  });

  it("should inject provided parameters", async () => {
    fetchMock.get(`${apiURL}/test`, response, { query: { a: "1", b: "2" } });
    await store.dispatch(
      assocPath(["request", "query"], { a: 1, b: 2 }, action)
    );
    expect(fetchMock.lastUrl()?.endsWith("?a=1&b=2")).toBeTruthy();
  });

  it("should return cached value if found", async () => {
    fetchMock.get(`${apiURL}/test`, response);
    expect(
      await store.dispatch({
        ...action,
        attemptToFetchFromStore: (state: typeof initialState) =>
          state.entities.test,
      })
    ).toBe(initialState.entities.test);
    expect(fetchMock.calls().length).toBe(0);
  });

  it("should call onSuccess on successful api call (if provided)", async () => {
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    fetchMock.get(`${apiURL}/test`, response);
    await store.dispatch({ ...action, onSuccess, onFailure });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(onFailure).not.toHaveBeenCalled();
  });

  it("should call onFailure on faulty api call (if provided)", async () => {
    fetchMock.get(`${apiURL}/faulty`, () => {
      throw new Error("Network Error");
    });
    const onSuccess = jest.fn();
    const onFailure = jest.fn();
    await store.dispatch({
      ...assocPath(["request", "endpoint"], "/faulty", action),
      onSuccess,
      onFailure,
    });

    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
