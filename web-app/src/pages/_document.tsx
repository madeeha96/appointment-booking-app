import { Head, Html, Main, NextScript } from "next/document";
import React, { JSX } from "react";

/**
 * Framework file by NextJS
 *
 * @returns {Element} Document outline
 */
export default function Document(): JSX.Element {
  return (
    <Html>
      <Head>
        <title>Booking Management App</title>
        <meta name="description" content="This is booking app." />
        <meta property="og:title" content="Booking" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
