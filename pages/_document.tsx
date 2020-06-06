import { Global } from "@emotion/core";
import { extractCritical } from "emotion-server";
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
        <Head />
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
