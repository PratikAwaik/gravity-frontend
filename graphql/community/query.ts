import { gql } from "@apollo/client";

export const GET_COMMUNITY_DETAILS = gql`
  query GetCommunityDetails($name: String!) {
    getCommunityDetails(name: $name) {
      id
      icon
      name
      prefixedName
      description
      membersCount
      admin {
        id
        username
        prefixedName
      }
      createdAt
      members {
        id
        profilePic
        username
      }
    }
  }
`;
