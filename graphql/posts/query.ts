import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query {
    allPosts {
      id
      title
      content
      score
      author {
        id
        prefixedName
      }
      community {
        id
        prefixedName
        icon
      }
      type
      commentsCount
      createdAt
      updatedAt
    }
  }
`;
