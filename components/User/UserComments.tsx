import CommentsFeed from "../Comments/CommentsFeed";
import LoadingWrapper from "../Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMMENTS } from "../../graphql/comments/query";
import { useCommentsStore } from "../../stores/comments";

interface UserCommentsProps {
  userId: string;
}

export default function UserComments({ userId }: UserCommentsProps) {
  const { data, loading, fetchMore } = useQuery(GET_ALL_COMMENTS, {
    variables: {
      userId,
      pageNo: 0,
    },
    skip: !userId,
  });
  const { pageNo, setPageNo, hasMore, setHasMore } = useCommentsStore(
    (state) => ({
      pageNo: state.userCommentsPageNo,
      setPageNo: state.setUserCommentsPageNo,
      hasMore: state.userCommentsHasMore,
      setHasMore: state.setUserCommentsHasMore,
    })
  );

  return (
    <LoadingWrapper isLoading={loading}>
      <CommentsFeed
        userId={userId}
        comments={data?.getAllComments}
        fetchMore={fetchMore}
        pageNo={pageNo}
        setPageNo={setPageNo}
        hasMore={hasMore}
        setHasMore={setHasMore}
      />
    </LoadingWrapper>
  );
}
