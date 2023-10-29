import type { AppProps } from "next/app";
import Head from "next/head";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { QueryClientProvider } from "@tanstack/react-query";

import "@/styles/globals.css";
import { queryClient } from "@/http";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RMDB</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Component {...pageProps} />
          </ThemeProvider>
        </NextUIProvider>
      </QueryClientProvider>
    </>
  );
}
