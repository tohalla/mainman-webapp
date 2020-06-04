import React from "react";
import NextDocument, {
  Head,
  Main,
  NextScript,
  DocumentContext,
  Html,
} from "next/document";
import { extractCritical } from "emotion-server";

import { Context, LocaleProps } from "../server";

export default class Document extends NextDocument<LocaleProps> {
  static async getInitialProps(ctx: DocumentContext & Context) {
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
            data-emotion-css={styles.ids.join(" ")}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
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
