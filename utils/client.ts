import StorageService from "../services/storage";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LOCAL_STORAGE_KEYS } from "./constants";
import { offsetLimitPagination } from "@apollo/client/utilities";

const authLink = setContext((_, { headers }) => {
  const user = StorageService.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
  if (user) {
    const parsedUser = JSON.parse(user);
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${parsedUser?.token?.value}`,
      },
    };
  }
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allPosts: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: ["communityId", "userId"],
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
          getAllUserComments: {
            keyArgs: ["userId"],
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
