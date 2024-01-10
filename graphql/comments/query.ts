import {gql} from "@apollo/client";

export const CommentDetailsFragment = gql`
  fragment CommentDetailsFragment on Comment {
    author {
      id
      username
      icon {
        url
        publicId
      }
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
    post {
      id
      title
      author {
        id
        username
        prefixedName
      }
      community {
        id
        name
        prefixedName
      }
    }
  }
`;

export const GET_ALL_POST_COMMENTS = gql`
  ${CommentDetailsFragment}
  query GetAllPostComments($postId: String!, $parentId: String) {
    allComments(postId: $postId, parentId: $parentId) {
      ${getNestedCommentsQuery("...CommentDetailsFragment")}
    }
  }
`;

export const GET_ALL_COMMENTS = gql`
  ${CommentDetailsFragment}
  query GetAllComments($pageNo: Int, $userId: String, $search: String) {
    getAllComments(pageNo: $pageNo, userId: $userId, search: $search) {
      ...CommentDetailsFragment
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
