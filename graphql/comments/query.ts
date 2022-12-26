import { gql } from "@apollo/client";

export const GET_ALL_POST_COMMENTS = gql`
  fragment CommentDetailsFragment on Comment {
    author {
      id
      username
    }
    createdAt
    updatedAt
    content
    score
    deleted
    id
    parentId
    commentScores {
      userId
      direction
    }
  }

  query GetAllPostComments($postId: String!, $parentId: String) {
    allComments(postId: $postId, parentId: $parentId) {
      ...CommentDetailsFragment
      children {
        ...CommentDetailsFragment
        children {
          ...CommentDetailsFragment
          children {
            ...CommentDetailsFragment
          }
        }
      }
    }
  }
`;
