import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts($cursor: Int) {
    allPosts(cursor: $cursor) {
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
      postScores {
        userId
        direction
      }
      type
      mediaType
      articleImage
      commentsCount
      createdAt
      updatedAt
    }
  }
`;

export const GET_POST_BY_ID = gql`
  query GetPostById($postId: String!) {
    getPostById(postId: $postId) {
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
      postScores {
        userId
        direction
      }
      type
      mediaType
      articleImage
      commentsCount
      createdAt
      updatedAt
    }
  }
`;
