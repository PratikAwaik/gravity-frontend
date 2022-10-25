import { gql } from "@apollo/client";

export const UPDATE_POST_SCORE = gql`
  mutation UpdatePostScore($postId: String!, $direction: Direction!) {
    updatePostScore(postId: $postId, direction: $direction) {
      postScores {
        userId
        direction
      }
    }
  }
`;
