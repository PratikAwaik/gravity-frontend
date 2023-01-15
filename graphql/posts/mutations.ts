import { gql } from "@apollo/client";

export const UPDATE_POST_SCORE = gql`
  mutation UpdatePostScore($postId: String!, $direction: Direction!) {
    updatePostScore(postId: $postId, direction: $direction) {
      id
      score
      postScores {
        userId
        direction
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $type: PostType!
    $communityId: String!
  ) {
    createPost(
      title: $title
      content: $content
      type: $type
      communityId: $communityId
    ) {
      id
      title
      content
      type
      score
      commentsCount
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
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($postId: String!, $content: String!) {
    updatePost(postId: $postId, content: $content) {
      id
      content
      updatedAt
    }
  }
`;
