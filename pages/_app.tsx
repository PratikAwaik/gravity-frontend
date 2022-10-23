import "../styles/globals.css";
import "remixicon/fonts/remixicon.css";
import Layout from "../components/Utils/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/client";
import { AppProps } from "next/app";
import { AuthProvider } from "../utils/Auth";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}
