import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts($pageNo: Int, $communityId: String) {
    allPosts(pageNo: $pageNo, communityId: $communityId) {
      id
      title
      content
      score
      author {
        id
        username
        prefixedName
      }
      community {
        id
        name
        prefixedName
        icon
        members {
          id
          username
        }
        admin {
          id
        }
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
        username
        prefixedName
      }
      community {
        id
        name
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
