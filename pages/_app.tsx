import "isomorphic-unfetch";
import "normalize.css";
import "react-toastify/dist/ReactToastify.css";

import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { NextComponentType } from "next";
import NextApp, { AppContext, AppProps } from "next/app";
import React, { useMemo } from "react";
import {
  IntlConfig,
  RawIntlProvider,
  createIntl,
  createIntlCache,
} from "react-intl";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ServerContext } from "server";
import { fetchAccountWithHeaders } from "src/auth";
import { queryClient } from "src/config/react-query";
import ToastContainer from "src/general/ToastContainer";
import DefaultLayout, {
  LayoutProps,
  Props as DefaultLayoutProps,
} from "src/Layout";
import theme from "src/theme";
import { onError } from "src/util/intl";
import { redirect } from "src/util/routing";

type Context = AppContext & {
  ctx: ServerContext;
};
export type Page = {
  Layout?: React.FC<DefaultLayoutProps>;
  layoutProps?: Omit<LayoutProps, "children">;
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
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Layout layoutProps={Component.layoutProps}>
              <NextApp
                Component={Component}
                pageProps={pageProps}
                router={router}
              />
              <ToastContainer />
            </Layout>
          </QueryClientProvider>
        </ThemeProvider>
      </RawIntlProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  await fetchAccountWithHeaders(ctx.req?.headers as RequestInit["headers"])
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
