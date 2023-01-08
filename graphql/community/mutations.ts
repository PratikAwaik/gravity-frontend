import { gql } from "@apollo/client";

export const CREATE_COMMUNITY = gql`
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

export const JOIN_COMMUNITY = gql`
  mutation JoinCommunity($communityId: String!) {
    joinCommunity(communityId: $communityId) {
      id
      members {
        id
        username
      }
    }
  }
`;
