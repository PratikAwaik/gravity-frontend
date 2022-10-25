import { gql } from "@apollo/client";

export const GET_USER_SUBSCRIPTIONS = gql`
  query Query {
    userSubscriptions {
      id
      prefixedName
      icon
      membersCount
    }
  }
`;
