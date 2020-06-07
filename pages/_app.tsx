import "isomorphic-unfetch";
import "normalize.css";

import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { NextComponentType } from "next";
import NextApp, { AppContext, AppProps } from "next/app";
import React, { useState } from "react";
import {
  IntlConfig,
  RawIntlProvider,
  createIntl,
  createIntlCache,
} from "react-intl";

import { ServerContext } from "../server";
import Loadable from "../src/general/Loadadble";
import DefaultLayout from "../src/Layout";
import { getStore, wrapper } from "../src/store";
import theme from "../src/theme";

type Context = AppContext & {
  ctx: ServerContext;
};
export type Page = {
  Layout?: typeof DefaultLayout;
} & AppProps["Component"];
type Props = AppProps &
  IntlConfig & {
    store: ReturnType<typeof getStore>;
    Component: Page;
  };

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

  const intl = createIntl(
    {
      locale,
      messages,
    },
    intlCache
  );

  const Layout = Component.Layout ?? DefaultLayout;

  return (
    <CacheProvider value={cache}>
      <RawIntlProvider value={intl}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Loadable isLoading={loading}>
              <NextApp
                Component={Component}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                pageProps={pageProps}
                router={router}
              />
            </Loadable>
          </Layout>
        </ThemeProvider>
      </RawIntlProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const {
    req: { locale, messages },
  } = ctx;

  return { pageProps, locale, messages };
};

export default wrapper.withRedux(App);
