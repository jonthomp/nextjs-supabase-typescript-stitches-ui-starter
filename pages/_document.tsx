import Document, { Html, Head, Main, NextScript } from "next/document";
import { getCssString, globalStyles } from "../stitches.config";

export default class MyDocument extends Document {
  render() {
    globalStyles();
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon-32x32.png"
            sizes="32x32"
          />

          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
