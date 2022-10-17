import { gql } from "@apollo/client";

export const CREATE_SUBREDDIT = gql`
  mutation ($name: String!, $description: String!, $icon: String) {
    createNewSubreddit(name: $name, description: $description, icon: $icon) {
      id
      name
      prefixedName
      description
      icon
      createdAt
      updatedAt
    }
  }
`;
