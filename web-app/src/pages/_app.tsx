import "@/styles/globals.css";
import BasicLayout from "@/components/Layout";
import type { AppProps } from "next/app";

import { Roboto } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

const queryClient = new QueryClient();

/**
 * The main entry point of the next js application.
 *
 * @param {AppProps} param0 The properties of the app component.
 * @returns {ReactElement} The application component.
 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <BasicLayout font={roboto.className}>
        <Component {...pageProps} />
      </BasicLayout>
    </QueryClientProvider>
  );
}
