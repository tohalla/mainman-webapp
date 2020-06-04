import React from "react";
import { NextComponentType } from "next";
import NextApp, { AppContext, AppProps } from "next/app";
import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import {
  createIntl,
  createIntlCache,
  RawIntlProvider,
  IntlConfig,
} from "react-intl";

import { getStore, wrapper } from "../src/store";
import { Context } from "../server";

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
        <NextApp Component={Component} pageProps={pageProps} router={router} />
      </RawIntlProvider>
    </CacheProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const { req } = ctx;
  const { locale, messages } = req;

  return { pageProps, locale, messages };
};

export default wrapper.withRedux(App);
