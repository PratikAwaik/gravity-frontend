import "../styles/globals.css";
import "remixicon/fonts/remixicon.css";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/client";

export default function MyApp({
  Component,
  pageProps,
}: {
  Component: any;
  pageProps: any;
}) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
