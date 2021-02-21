import "normalize.css";
import "react-toastify/dist/ReactToastify.css";

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
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
import { ThemeProvider } from "theme-ui";

import { ServerContext } from "server";
import { fetchAccountWithHeaders } from "src/accounts";
import { queryClient } from "src/config/react-query";
import Loadable from "src/general/Loadadble";
import ToastContainer from "src/general/ToastContainer";
import DefaultLayout, {
  LayoutProps,
  Props as DefaultLayoutProps,
} from "src/Layout";
import theme from "src/theme";
import { onError } from "src/util/intl";
import { redirect, isProtectedRoute } from "src/util/routing";

type Context = AppContext & {
  ctx: ServerContext;
};
export type Page = {
  Layout?: React.FC<DefaultLayoutProps>;
  layoutProps?: Omit<LayoutProps, "children">;
} & AppProps["Component"];
type Props = AppProps & IntlConfig & { Component: Page };

const intlCache = createIntlCache();
const emotionCache = createCache({ key: "mainman" });

const App: NextComponentType<Context, Record<string, unknown>, Props> = ({
  Component,
  locale = "en",
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
    <CacheProvider value={emotionCache}>
      <RawIntlProvider value={intl}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <Loadable>
              <Layout layoutProps={Component.layoutProps}>
                <NextApp
                  Component={Component}
                  pageProps={pageProps}
                  router={router}
                />
                <ToastContainer />
              </Layout>
            </Loadable>
          </QueryClientProvider>
        </ThemeProvider>
      </RawIntlProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  await fetchAccountWithHeaders(
    ctx.req?.headers as RequestInit["headers"],
    (name, value) => ctx.res?.setHeader(name, value)
  )
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
        condition: isProtectedRoute,
      })
    );

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const { req: { locale, messages } = {} } = ctx;

  return { pageProps, locale, messages };
};

export default App;
