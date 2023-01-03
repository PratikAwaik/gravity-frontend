import { gql } from "@apollo/client";

export const GET_ALL_POST_COMMENTS = gql`
  fragment CommentDetailsFragment on Comment {
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

  query GetAllPostComments($postId: String!, $parentId: String) {
    allComments(postId: $postId, parentId: $parentId) {
      ${getNestedCommentsQuery("...CommentDetailsFragment")}
    }
  }
`;

function getNestedCommentsQuery(initialQuery: any, depth = 20): any {
  if (depth === 0) return initialQuery;
  return `
    ${initialQuery}
    children {
      ${getNestedCommentsQuery(initialQuery, depth - 1)}
    }
  `;
}
