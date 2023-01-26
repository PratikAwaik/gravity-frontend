import UserCommentsFeed from "./UserCommentsFeed";
import LoadingWrapper from "../Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { GET_ALL_USER_COMMENTS } from "../../graphql/comments/query";

interface UserCommentsProps {
  userId: string;
}

export default function UserComments({ userId }: UserCommentsProps) {
  const { data, loading, fetchMore } = useQuery(GET_ALL_USER_COMMENTS, {
    variables: {
      userId,
      pageNo: 0,
    },
    skip: !userId,
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <UserCommentsFeed
        userId={userId}
        userComments={data?.getAllUserComments}
        fetchMore={fetchMore}
      />
    </LoadingWrapper>
  );
}
