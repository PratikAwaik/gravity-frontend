import StorageService from "../services/storage";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_KEYS } from "./constants";

const authLink = setContext((_, { headers }) => {
  const user = StorageService.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
  if (user) {
    const parsedUser = JSON.parse(user);
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${parsedUser?.token?.value}`,
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
});

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_GRAPHQL_DEV_URI
      : process.env.NEXT_PUBLIC_GRAPHQL_PROD_URI,
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: {
            keyArgs: ["communityId", "userId", "search"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          getAllComments: {
            keyArgs: ["userId", "search"],
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  link: authLink.concat(httpLink),
  connectToDevTools: true,
});

export default client;
