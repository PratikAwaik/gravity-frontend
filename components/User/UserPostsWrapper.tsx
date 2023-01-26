import LoadingWrapper from "../Utils/LoadingWrapper";
import UserPosts from "./UserPosts";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../graphql/posts/query";

interface UserPostWrapperProps {
  userId: string;
}

export default function UserPostsWrapper({ userId }: UserPostWrapperProps) {
  const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: {
      userId: userId,
      pageNo: 0,
    },
    skip: !userId,
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <UserPosts
        userId={userId}
        userPosts={data?.allPosts}
        fetchMore={fetchMore}
      />
    </LoadingWrapper>
  );
}
