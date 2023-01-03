import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $content: String!
    $postId: String!
    $parentId: String
  ) {
    createComment(content: $content, postId: $postId, parentId: $parentId) {
      author {
        id
        username
        profilePic
      }
      createdAt
      updatedAt
      content
      score
      deleted
      id
      parentId
      postId
      commentScores {
        userId
        direction
      }
      children {
        author {
          id
          username
          profilePic
        }
        createdAt
        updatedAt
        content
        score
        deleted
        id
        parentId
        postId
        commentScores {
          userId
          direction
        }
      }
    }
  }
`;

export const UPDATE_COMMENT_SCORE = gql`
  mutation UpdateCommentScore($commentId: String!, $direction: Direction!) {
    updateCommentScore(commentId: $commentId, direction: $direction) {
      commentScores {
        userId
        direction
      }
    }
  }
`;
