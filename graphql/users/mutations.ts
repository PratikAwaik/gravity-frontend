import {gql} from "@apollo/client";

export const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
      icon {
        url
        publicId
      }
      karma
      token {
        value
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      id
      username
      icon {
        url
        publicId
      }
      karma
      token {
        value
      }
    }
  }
`;

export const UPDATE_LOGGED_IN_USER = gql`
  mutation UpdateLoggedInUser($payload: UpdateLoggedInUserPayload) {
    updateLoggedInUser(payload: $payload) {
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
