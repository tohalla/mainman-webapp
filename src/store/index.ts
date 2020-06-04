import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit";

import { createWrapper } from "next-redux-wrapper";
import reducer, { State } from "./reducer";

export const middleware = [...getDefaultMiddleware({})];

export const getStore = (preloadedState?: Partial<State>) => {
  const store = configureStore<State, Action<unknown>, typeof middleware>({
    reducer,
    middleware,
    preloadedState,
    devTools: process.env.NODE_ENV === "development",
  });

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./reducer", () => {
      // eslint-disable-next-line global-require,@typescript-eslint/no-unsafe-member-access
      store.replaceReducer(require("./reducer").default);
    });
  }

  return store;
};

export const wrapper = createWrapper<State>(getStore, {
  debug: process.env.NODE_ENV === "development",
});
