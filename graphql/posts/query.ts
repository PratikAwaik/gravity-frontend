import {gql} from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query GetAllPosts(
    $pageNo: Int
    $communityId: String
    $userId: String
    $search: String
  ) {
    allPosts(
      pageNo: $pageNo
      communityId: $communityId
      userId: $userId
      search: $search
    ) {
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
        icon {
          url
          publicId
        }
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
        icon {
          url
          publicId
        }
        members {
          id
          username
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
