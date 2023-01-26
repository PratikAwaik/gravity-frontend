import LoadingWrapper from "../Utils/LoadingWrapper";
import UserComments from "./UserComments";
import { useQuery } from "@apollo/client";
import { GET_ALL_USER_COMMENTS } from "../../graphql/comments/query";

interface UserCommentsWrapperProps {
  userId: string;
}

export default function UserCommentsWrapper({
  userId,
}: UserCommentsWrapperProps) {
  const { data, loading, fetchMore } = useQuery(GET_ALL_USER_COMMENTS, {
    variables: {
      userId,
      pageNo: 0,
    },
    skip: !userId,
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <UserComments
        userId={userId}
        userComments={data?.getAllUserComments}
        fetchMore={fetchMore}
      />
    </LoadingWrapper>
  );
}
