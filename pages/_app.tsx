import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import { ThemeProvider } from "emotion-theming";
import { NextComponentType } from "next";
import NextApp, { AppContext, AppProps } from "next/app";
import React from "react";
import {
  IntlConfig,
  RawIntlProvider,
  createIntl,
  createIntlCache,
} from "react-intl";

import { Context } from "../server";
import { getStore, wrapper } from "../src/store";
import theme from "../src/theme";

import "normalize.css";

interface Props extends AppProps, IntlConfig {
  store: ReturnType<typeof getStore>;
  pageProps: Record<string, unknown>;
}

const intlCache = createIntlCache();

const App: NextComponentType<
  AppContext & { ctx: Context },
  Record<string, unknown>,
  Props
> = ({ Component, locale, messages, router, pageProps }: Props) => {
  const intl = createIntl(
    {
      locale,
      messages,
    },
    intlCache
  );

  return (
    <CacheProvider value={cache}>
      <RawIntlProvider value={intl}>
        <ThemeProvider theme={theme}>
          <NextApp
            Component={Component}
            pageProps={pageProps}
            router={router}
          />
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
