import { gql } from "@apollo/client";

export const CREATE_COMMENT_FRAGMENT = gql`
  fragment CreateCommentFragment on Comment {
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
`;

export const CREATE_COMMENT = gql`
  ${CREATE_COMMENT_FRAGMENT}
  mutation CreateComment(
    $content: String!
    $postId: String!
    $parentId: String
  ) {
    createComment(content: $content, postId: $postId, parentId: $parentId) {
      ...CreateCommentFragment
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
      id
      score
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($commentId: String!, $content: String!) {
    updateComment(commentId: $commentId, content: $content) {
      id
      content
      updatedAt
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: String!, $postId: String!) {
    deleteComment(commentId: $commentId, postId: $postId) {
      id
      deleted
      postId
    }
  }
`;
