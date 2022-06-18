import "../styles/globals.css";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";
import { trpc } from "../utils/trpc";
import { ChakraProvider, Colors, extendTheme } from "@chakra-ui/react";

const getTheme = (colors: { brand: { [key: number]: string } }) => {
  return extendTheme({
    colors,
  });
};

function MyApp({ Component, pageProps }: AppProps) {
  const colors = trpc.useQuery(["colors"]);

  if (!colors.data) {
    return <div>Loading ...</div>;
  }

  return (
    <ChakraProvider theme={getTheme(colors.data.colors)}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  ssr: true,
})(MyApp);
