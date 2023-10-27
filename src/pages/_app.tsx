import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
