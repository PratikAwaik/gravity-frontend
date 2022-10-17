import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      value
    }
  }
`;

export const REGISTER_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    createNewUser(username: $username, email: $email, password: $password) {
      id
      username
      token {
        value
      }
    }
  }
`;
