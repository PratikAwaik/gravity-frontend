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
      }
      content
      createdAt
      deleted
      id
      parentId
      score
      updatedAt
      commentScores {
        userId
        direction
      }
    }
  }
`;
