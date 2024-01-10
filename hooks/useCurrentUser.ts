import {useQuery} from "@apollo/client";
import {useAuth} from "../utils/Auth";
import {GET_USER_DETAILS} from "../graphql/users/query";

export const useCurrentUser = () => {
  const {currentUser: authLSUser} = useAuth();
  const {data, loading} = useQuery(GET_USER_DETAILS, {
    variables: {
      username: authLSUser?.username,
    },
    skip: !authLSUser?.username,
  });

  return {
    currentUser: data?.getUserDetails,
    loadingUser: loading,
  };
};
