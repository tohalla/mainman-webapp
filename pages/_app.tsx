import React from "react";
import withRedux from "next-redux-wrapper";
import { NextComponentType } from "next";
import NextApp, { AppContext, AppProps } from "next/app";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";

import { getStore } from "../src/store";

interface Props extends AppProps {
  store: ReturnType<typeof getStore>;
}

const App: NextComponentType<AppContext, Record<string, unknown>, Props> = ({
  Component,
  store,
  router,
}: Props) => {
  return (
    <CacheProvider value={cache}>
      <Provider store={store}>
        <NextApp Component={Component} pageProps={{}} router={router} />
      </Provider>
    </CacheProvider>
  );
};

export default withRedux(getStore)(App);
