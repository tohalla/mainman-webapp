import "isomorphic-unfetch";
import "normalize.css";

import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { NextComponentType } from "next";
import NextApp, { AppContext, AppProps } from "next/app";
import React, { useState, useMemo } from "react";
import {
  IntlConfig,
  RawIntlProvider,
  createIntl,
  createIntlCache,
} from "react-intl";
import {
  ReactQueryConfigProvider,
  ReactQueryProviderConfig,
} from "react-query";

import { ServerContext } from "../server";
import { fetchAccountWithCtx } from "../src/auth";
import Loadable from "../src/general/Loadadble";
import DefaultLayout from "../src/Layout";
import theme from "../src/theme";
import { redirect } from "../src/util/routing";

type Context = AppContext & {
  ctx: ServerContext;
};
export type Page = {
  Layout?: typeof DefaultLayout;
} & AppProps["Component"];
type Props = AppProps & IntlConfig & { Component: Page };

const intlCache = createIntlCache();

const queryConfig: ReactQueryProviderConfig = {
  refetchAllOnWindowFocus: false,
};

const App: NextComponentType<Context, Record<string, unknown>, Props> = ({
  Component,
  locale,
  messages,
  router,
  pageProps,
}: Props) => {
  const [loading, setLoading] = useState(false);

  if (typeof router.events !== "undefined") {
    router.events.on("routeChangeStart", () => setLoading(true));
    router.events.on("routeChangeComplete", () => setLoading(false));
  }

  const intl = useMemo(
    () =>
      createIntl(
        {
          locale,
          messages,
        },
        intlCache
      ),
    []
  );

  const Layout = Component.Layout ?? DefaultLayout;

  return (
    <CacheProvider value={cache}>
      <RawIntlProvider value={intl}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Loadable isLoading={loading}>
              <ReactQueryConfigProvider config={queryConfig}>
                <NextApp
                  Component={Component}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  pageProps={pageProps}
                  router={router}
                />
              </ReactQueryConfigProvider>
            </Loadable>
          </Layout>
        </ThemeProvider>
      </RawIntlProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  await fetchAccountWithCtx(ctx)
    .then(() =>
      redirect({
        ctx,
        location: "/",
        condition: (route) => route.startsWith("/auth"),
      })
    )
    .catch(() =>
      redirect({
        ctx,
        location: "/auth",
        condition: (route) => !route.startsWith("/auth"),
      })
    );

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const { req: { locale, messages } = {} } = ctx;

  return { pageProps, locale, messages };
};

export default App;
