import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query AllPosts {
    allPosts {
      id
      title
      content
      author {
        id
        prefixedName
      }
      community {
        id
        prefixedName
      }
      type
      commentsCount
      createdAt
      updatedAt
    }
  }
`;
