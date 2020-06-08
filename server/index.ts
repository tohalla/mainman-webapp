import { readFileSync } from "fs";
import { createServer, RequestListener } from "http";
import { basename } from "path";

import accepts from "accepts";
import glob from "glob";
import next, { NextPageContext } from "next";
import { IntlConfig } from "react-intl";

export interface LocaleProps extends Pick<IntlConfig, "messages" | "locale"> {
  localeDataScript: string;
}
export type ServerContext = NextPageContext & {
  req: Express.Request & LocaleProps;
};

// Get the supported languages by looking for translations in the `lang/` dir.
const supportedLanguages = glob
  .sync("./lang/*.json")
  .map((f) => basename(f, ".json"));

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
const listener: RequestListener = (req, res) => {
  const locale = accepts(req).language(supportedLanguages) || "en";
  Object.assign(req, {
    locale,
    localeDataScript: getLocaleDataScript(locale),
    messages: dev ? {} : getMessages(locale),
  });
  handle(req, res).catch(console.error);
};

app
  .prepare()
  .then(() => createServer(listener).listen(port))
  .catch(console.error);
/* eslint-enable no-console */
