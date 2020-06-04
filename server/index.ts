import { readFileSync } from "fs";
import { createServer } from "http";
import { basename } from "path";

import accepts from "accepts";
import glob from "glob";
import intlPolyfill from "intl";
import areIntlLocalesSupported from "intl-locales-supported";
import next, { NextPageContext } from "next";
import { IntlConfig } from "react-intl";

export interface LocaleProps extends Pick<IntlConfig, "messages" | "locale"> {
  localeDataScript: string;
}
export type Context = NextPageContext & {
  req: Express.Request & LocaleProps;
};

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob
  .sync("./lang/*.json")
  .map((f) => basename(f, ".json"));

if (global.Intl) {
  if (!areIntlLocalesSupported(supportedLanguages)) {
    Intl.NumberFormat = intlPolyfill.NumberFormat;
    Intl.DateTimeFormat = intlPolyfill.DateTimeFormat;
    /* eslint-disable */
    // @ts-ignore
    Intl.__disableRegExpRestore = intlPolyfill.__disableRegExpRestore;
    /* eslint-enable */
  }
} else {
  global.Intl = intlPolyfill;
}

// Fix: https://github.com/vercel/next.js/issues/11777
// See related issue: https://github.com/andyearnshaw/Intl.js/issues/308
/* eslint-disable */
// @ts-ignore
if (Intl.__disableRegExpRestore) {
  // @ts-ignore
  Intl.__disableRegExpRestore();
}
/* eslint-enable */

const port = parseInt(process.env.PORT ?? "", 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const localeDataCache = new Map<string, unknown>();
const getLocaleDataScript = (locale: string) => {
  const lang = locale.split("-")[0];
  if (!localeDataCache.has(lang)) {
    const localeDataFile = require.resolve(
      `@formatjs/intl-relativetimeformat/dist/locale-data/${lang}`
    );
    const localeDataScript = readFileSync(localeDataFile, "utf8");
    localeDataCache.set(lang, localeDataScript);
  }
  return localeDataCache.get(lang);
};

const getMessages: (locale: string) => Record<string, string> = (locale) => {
  // eslint-disable-next-line
  return require(`./lang/${locale}.json`);
};

/* eslint-disable no-console */
app
  .prepare()
  .then(() => {
    createServer((req, res) => {
      const locale = accepts(req).language(supportedLanguages) || "en";
      Object.assign(req, {
        locale,
        localeDataScript: getLocaleDataScript(locale),
        messages: dev ? {} : getMessages(locale),
      });
      handle(req, res).catch(console.error);
    }).listen(port);
  })
  .catch(console.error);
/* eslint-enable no-console */
