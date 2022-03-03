import "../styles/globals.css";
import "remixicon/fonts/remixicon.css";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../utils/client";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
