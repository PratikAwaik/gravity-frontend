import { gql } from "@apollo/client";

export const CREATE_SUBREDDIT = gql`
  mutation ($name: String!, $description: String!) {
    createCommunity(name: $name, description: $description) {
      id
      name
      prefixedName
      description
      createdAt
      updatedAt
    }
  }
`;
