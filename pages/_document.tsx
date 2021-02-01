import { Global } from "@emotion/react";
import { extractCritical } from "@emotion/server";
import sha256 from "crypto-js/sha256";
import NextDocument, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  Html,
} from "next/document";
import React from "react";

import { ServerContext, LocaleProps } from "../server";
import global from "../src/theme/global";

import { apiURL } from "src/util/api";

export default class Document extends NextDocument<LocaleProps> {
  static async getInitialProps(ctx: DocumentContext & ServerContext) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    const {
      req: { locale, localeDataScript },
    } = ctx;

    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      locale,
      localeDataScript,
      styles: (
        <>
          {initialProps.styles}
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles.css }}
            data-emotion-css={styles.ids.join(" ")}
          />
          <Global styles={global} />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            content={`style-src 'self' 'unsafe-inline'; script-src${
              process.env.NODE_ENV === "production" ? "" : " 'unsafe-eval'"
            } ${sha256(
              NextScript.getInlineScriptSource(this.props)
            ).toString()} 'unsafe-inline' 'self' https://js.stripe.com; font-src 'self' data:; frame-src https://js.stripe.com https://hooks.stripe.com; img-src 'self' data:; default-src 'self' ${apiURL};`}
            httpEquiv="Content-Security-Policy"
          />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
        </body>
      </Html>
    );
  }
}
