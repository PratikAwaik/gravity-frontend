import {gql} from "@apollo/client";

export const CREATE_COMMUNITY = gql`
  mutation ($name: String!, $description: String!) {
    createCommunity(name: $name, description: $description) {
      id
      name
      prefixedName
      description
      createdAt
      updatedAt
    }
  }
`;

export const JOIN_COMMUNITY = gql`
  mutation JoinCommunity($communityId: String!) {
    joinCommunity(communityId: $communityId) {
      id
      members {
        id
        username
      }
    }
  }
`;

export const LEAVE_COMMUNITY = gql`
  mutation LeaveCommunity($communityId: String!) {
    leaveCommunity(communityId: $communityId) {
      id
      members {
        id
        username
      }
    }
  }
`;

export const UDPATE_COMMUNITY = gql`
  mutation UpdateCommunity($communityId: String!, $icon: CommunityIconPayload) {
    updateCommunity(communityId: $communityId, icon: $icon) {
      id
      name
      prefixedName
      description
      icon {
        url
        publicId
      }
    }
  }
`;
