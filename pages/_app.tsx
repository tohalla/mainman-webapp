import "isomorphic-unfetch";
import "normalize.css";
import "react-toastify/dist/ReactToastify.css";

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
import { ReactQueryConfigProvider } from "react-query";

import { ServerContext } from "server";
import { fetchAccountWithHeaders, refreshSession } from "src/auth";
import { queryConfig } from "src/config/react-query";
import ToastContainer from "src/general/ToastContainer";
import DefaultLayout, {
  LayoutProps,
  Props as DefaultLayoutProps,
} from "src/Layout";
import theme from "src/theme";
import { parseCookieHeader } from "src/util/cookie";
import { onError } from "src/util/intl";
import { redirect } from "src/util/routing";

type Context = AppContext & {
  ctx: ServerContext;
};
export type Page = {
  Layout?: React.FC<DefaultLayoutProps>;
  layoutProps?: Omit<LayoutProps, "children" | "isLoading">;
} & AppProps["Component"];
type Props = AppProps & IntlConfig & { Component: Page };

const intlCache = createIntlCache();

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
          onError,
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
          <Layout isLoading={loading} layoutProps={Component.layoutProps}>
            <ReactQueryConfigProvider config={queryConfig}>
              <NextApp
                Component={Component}
                pageProps={pageProps}
                router={router}
              />
            </ReactQueryConfigProvider>
            <ToastContainer />
          </Layout>
        </ThemeProvider>
      </RawIntlProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  await fetchAccountWithHeaders(ctx.req?.headers as RequestInit["headers"])
    .catch(async (error: Response) => {
      if (error.status === 401) {
        const res = await refreshSession(
          ctx.req?.headers as RequestInit["headers"]
        );

        if (res.headers.get("Set-Cookie")) {
          return ctx.res?.setHeader(
            "Set-Cookie",
            parseCookieHeader(res.headers.get("Set-Cookie") ?? "")
          );
        }
      }
      throw error;
    })
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
