import {gql} from "@apollo/client";

export const GET_USER_SUBSCRIPTIONS = gql`
  query GetUserSubscriptions {
    userSubscriptions {
      id
      name
      prefixedName
      icon {
        url
        publicId
      }
      membersCount
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query GetUserDetails($username: String!) {
    getUserDetails(username: $username) {
      id
      username
      prefixedName
      icon {
        url
        publicId
      }
      karma
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers($search: String, $pageNo: Int) {
    getAllUsers(search: $search, pageNo: $pageNo) {
      id
      username
      prefixedName
      icon {
        url
        publicId
      }
      karma
    }
  }
`;
