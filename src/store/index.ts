import { configureStore, getDefaultMiddleware, Action } from "@reduxjs/toolkit";

import { MakeStore } from "next-redux-wrapper";
import reducer, { State } from "./reducer";

export const middleware = [...getDefaultMiddleware({})];

export const getStore: MakeStore = () => {
  const store = configureStore<State, Action<unknown>, typeof middleware>({
    reducer,
    middleware,
  });

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./reducer", () => {
      // eslint-disable-next-line global-require,@typescript-eslint/no-unsafe-member-access
      store.replaceReducer(require("./reducer").default);
    });
  }

  return store;
};
